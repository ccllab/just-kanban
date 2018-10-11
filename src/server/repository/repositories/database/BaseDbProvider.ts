import {Connection, getConnection} from 'typeorm';
import {IDbProvider} from './IDbProvider';
import {injectable} from 'inversify';

/**
 * database 連線來源基底類別
 */
@injectable()
export abstract class BaseDbProvider implements IDbProvider {

    /**
     * 抽象方法，定義連線名稱
     */
    public abstract connectionName: string;

    /**
     * 取得指定連線
     * @returns db 連線
     */
    public getDb(): Connection {

        return getConnection(this.connectionName);
    }
}