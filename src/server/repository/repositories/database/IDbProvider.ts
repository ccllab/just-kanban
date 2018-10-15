import {Connection} from 'typeorm';

/**
 * The interface for DbProvider.
 */
export interface IDbProvider {

    /**
     * The name of connection.
     */
    connectionName: string

    /**
     * Get specified db connection by connection name.
     */
    getDb(): Connection;
}
