import {BaseDbProvider} from './BaseDbProvider';
import {injectable} from 'inversify';

/**
 * The MongoDB DbProvider
 */
@injectable()
export class MongoDbProvider extends BaseDbProvider {

    /**
     * connection name
     */
    public connectionName = 'default';
}
