import {BaseDbProvider} from './BaseDbProvider';
import {injectable} from 'inversify';

/**
 * Postgres DB 連線來源
 */
@injectable()
export class MongoDbProvider extends BaseDbProvider {

    /**
     * 連線名稱
     */
    public connectionName = 'default';
}