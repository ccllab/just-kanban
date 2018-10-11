import {GenericRepositoryImpl} from "./GenericRepositoryImpl";
import {injectable} from "inversify";
import {IDbProvider} from "../..";
import {DeepPartial, FindConditions, ObjectID, Repository} from "typeorm";
import {decrypt} from "typeorm-encrypted";

/**
 * 由於 EntitySubscriber 無法捕捉 mongodb 之 afterLoad() 事件
 *
 * 因此覆寫 get & getBy 兩個方法
 */
@injectable()
export abstract class GenericMongoRepository<TEntity extends DeepPartial<TEntity>> extends GenericRepositoryImpl<TEntity> {

    /**
     * 建構子
     * @param dbProvider db 來源
     */
    protected constructor(dbProvider: IDbProvider) {
        super(dbProvider);
    }

    /**
     * 由 id 取得指定資料
     * @param id 實體資料 pk
     * @returns 實體資料
     */
    public get(id: string | number | Date | ObjectID): Promise<TEntity> {

        return this.getRepo().findOne(id)
            .then(async (foundEntity: TEntity | any | undefined) => {
                if (foundEntity) {
                    await decrypt(foundEntity);
                }

                return foundEntity;
            })
            .catch((err) => {
                throw err;
            });
    }

    /**
     * 由指定欄位取得單筆實體資料
     * @param conditions 指定過濾欄位
     * @return 實體資料
     */
    public getBy(conditions: FindConditions<TEntity>): Promise<TEntity> {

        return this.getRepo().findOne(conditions)
            .then(async (foundEntity: TEntity | any | undefined) => {
                if (foundEntity) {
                    await decrypt(foundEntity);
                }

                return foundEntity;
            })
            .catch((err) => {
                throw err;
            });
    }


    /**
     * 取得儲存庫
     * @returns 該實體資料表之儲存庫
     */
    public abstract getRepo(): Repository<TEntity>;
}