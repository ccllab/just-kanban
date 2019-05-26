import {GenericMongoRepository, IDbProvider, IUserRepository, User} from '..';
import {IExecutionContext} from "../../utils";
import {inject, injectable, named} from 'inversify';
import {Repository} from 'typeorm';
import {TYPES} from '../../ioc';

/**
 * The user repository implementation
 */
@injectable()
export class UserRepositoryImpl extends GenericMongoRepository<User> implements IUserRepository {

    /**
     * constructor
     * @param dbProvider The provider for database
     * @param executionContext IExecutionContext
     */
    public constructor(
        @inject(TYPES.IDbProvider) @named('mongo') dbProvider: IDbProvider,
        @inject(TYPES.IExecutionContext) executionContext: IExecutionContext
    ) {
        super(dbProvider, executionContext);
    }

    /**
     * Override getRepo, get the really User collection.
     * @returns The repository for specified collection.
     */
    public getRepo(): Repository<User> {

        return this.dbConnection.getMongoRepository(User) as Repository<User>;
    }
}
