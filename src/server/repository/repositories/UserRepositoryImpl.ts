import {TYPES} from '../../ioc';
import {GenericMongoRepository, IDbProvider, IUserRepository, User} from '..';
import {inject, injectable, named} from 'inversify';
import {Repository} from 'typeorm';

/**
 * 使用者資料儲存庫實作
 */
@injectable()
export class UserRepositoryImpl extends GenericMongoRepository<User> implements IUserRepository {

    /**
     * 建構子
     * @param dbProvider database 連線來源
     */
    public constructor(@inject(TYPES.IDbProvider) @named('mongo') dbProvider: IDbProvider) {

        super(dbProvider);
    }

    /**
     * 複寫 getRepo()，取得實際儲存庫
     * @returns 該實體資料表之儲存庫
     */
    public getRepo(): Repository<User> {

        return this.dbConnection.getMongoRepository(User) as Repository<User>;
    }
}
