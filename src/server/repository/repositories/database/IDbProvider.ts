import {Connection} from 'typeorm';

/**
 * DB 連線來源介面
 */
export interface IDbProvider {

    /**
     * 連線名稱
     */
    connectionName: string

    /**
     * 取得指定連線
     */
    getDb(): Connection;
}