import * as http from 'http';
import * as https from 'https';
import {Socket} from 'net';

/**
 * HTTP/HTTPS shutdown manager
 * modify from @moebius/http-graceful-shutdown，adding https.Server support.
 * @author Moebius https://github.com/moebius-mlm
 */
export class HttpShutdownManager {

    /**
     * Map for tracking opened connections.
     */
    private connections: { [key: number]: Socket } = {};

    /**
     * Id for next connection
     */
    private nextConnectionId = 0;

    /**
     * Flag indicating if server is terminating at the moment.
     */
    private terminating = false;

    /**
     *
     * @param server HTTP/HTTPS Server
     */
    public constructor(private server: http.Server | https.Server) {

        this.startWatchingServer();
    }

    /**
     * Destroys the connection if it's inactive.
     * @param connection Net socket
     */
    private static closeIdleConnection(connection: Socket | any): void {

        if (connection.$$isIdle) {
            connection.destroy();
        }
    }

    /**
     * Initiates graceful termination of the server.
     * It first asks server to stop accepting new requests and then
     * terminates all open idle connections.
     * By putting the server into termination phase all active connections
     * would be automatically terminated after requests are properly complete.
     * @param callback callback function for terminate
     */
    public terminate(callback: () => void): void {

        this.terminating = true;
        this.server.close(callback);

        for (const connectionId in this.connections) {
            if (this.connections.hasOwnProperty(connectionId)) {
                const socket = this.connections[connectionId];

                HttpShutdownManager.closeIdleConnection(socket);
            }
        }
    }

    /**
     * binding listeners to server itself
     */
    private startWatchingServer(): void {

        this.server.on('connection', this.onConnection.bind(this));
        this.server.on('request', this.onRequest.bind(this));
    }

    /**
     * Initializes new connection by adding idle flag to it and
     * tracks the connection inside of internal list.
     * @param connection Net Socket
     */
    private onConnection(connection: Socket | any): void {

        const connectionId = this.nextConnectionId++;

        // Marking connection as idle initially.
        connection.$$isIdle = true;

        // Adding connection to the list.
        this.connections[connectionId] = connection;

        // Removing connection from the list when it's closed.
        connection.on('close', () => delete this.connections[connectionId]);
    }

    /**
     * Changes connection status to active during the request.
     * Makes sure that connection is closed when request is finished during
     * shutdown phase.
     * @param request incoming message
     * @param response server's response
     */
    private onRequest(request: http.IncomingMessage, response: http.ServerResponse): void {

        const connection = (request.connection as any);

        // Marking connection as active.
        connection.$$isIdle = false;

        response.on('finish', () => {

            // Marking connection as idle.
            connection.$$isIdle = true;

            // Closing the connection after request is processed when
            // we are in termination phase.
            if (this.terminating) {
                HttpShutdownManager.closeIdleConnection(connection);
            }
        });
    }
}
