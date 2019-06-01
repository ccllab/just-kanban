import {Connection, getConnection} from 'typeorm';
import {IDbProvider} from './IDbProvider';
import {injectable} from 'inversify';

/**
 * The base class for DbProvider.
 */
@injectable()
export abstract class BaseDbProvider implements IDbProvider {

    /**
     * Get specified db connection by connection name.
     * @returns db connection
     */
    public getDb(): Connection {

        return getConnection(this.connectionName);
    }

    /**
     * Define database connection name
     */
    public abstract connectionName: string;
}
