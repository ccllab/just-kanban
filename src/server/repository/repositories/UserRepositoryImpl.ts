import {TYPES} from '../../ioc';
import {GenericMongoRepository, IDbProvider, IUserRepository, User} from '..';
import {inject, injectable, named} from 'inversify';
import {Repository} from 'typeorm';
import {sign} from 'jsonwebtoken';

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
     * 產生新的 access token
     * @param user 使用者實體資料
     * @return 取得新 token 的使用者資料
     */
    private static injectNewToken(user: User): User {

        const secretKey: string = process.env.SECRET_KEY;

        user.authToken = sign(
            {
                username: user.username,
                email: user.email
            },
            secretKey,
            {
                expiresIn: 86400
            }
        );

        return user;
    }

    /**
     * 複寫 getRepo()，取得實際儲存庫
     * @returns 該實體資料表之儲存庫
     */
    public getRepo(): Repository<User> {

        return this.dbConnection.getMongoRepository(User) as Repository<User>;
    }

    /**
     * 覆寫 add() 新增使用者時同時寫入 token
     * @param user 使用者實體資料
     * @return 新增成功的資料
     */
    public add(user: User): Promise<User> {

        return super.add(UserRepositoryImpl.injectNewToken(user));
    }

    /**
     * 覆寫 update() 新增使用者時同時寫入 token
     * @param user 使用者實體資料
     * @return 更新成功的資料
     */
    public update(user: User): Promise<User> {

        return super.update(UserRepositoryImpl.injectNewToken(user));
    }
}
