import {TYPES} from '../../ioc';
import {GenericMongoRepository, IDbProvider, IUserRepository, User} from '..';
import {inject, injectable, named} from 'inversify';
import {Repository} from 'typeorm';

/**
 * The user repository implementation
 */
@injectable()
export class UserRepositoryImpl extends GenericMongoRepository<User> implements IUserRepository {

    /**
     * constructor
     * @param dbProvider The provider for database
     */
    public constructor(@inject(TYPES.IDbProvider) @named('mongo') dbProvider: IDbProvider) {

        super(dbProvider);
    }

    /**
     * Override getRepo, get the really User collection.
     * @returns The repository for specified collection.
     */
    public getRepo(): Repository<User> {

        return this.dbConnection.getMongoRepository(User) as Repository<User>;
    }
}
