import {IDbProvider, IGenericRepository, IsolationLevel} from '../..';
import {injectable} from 'inversify';
import {
    Connection,
    DeepPartial,
    EntityManager,
    FindConditions,
    ObjectID,
    Repository,
} from 'typeorm';

/**
 * 泛型資料儲存庫基底類別
 * @param <TEntity> 實體資料型別
 */
@injectable()
export abstract class GenericRepositoryImpl<TEntity extends DeepPartial<TEntity>> implements IGenericRepository<TEntity> {

    /**
     * db 連線
     */
    protected dbConnection: Connection;

    /**
     * 建構子
     * @param dbProvider db 來源
     */
    protected constructor(dbProvider: IDbProvider) {

        this.dbConnection = dbProvider.getDb();
    }

    /**
     * 取得該表所有資料
     * @returns 所有資料
     */
    public getAll(): Promise<TEntity[]> {

        return this.getRepo().find();
    }

    /**
     * 新增一筆資料
     * @param entity 欲新增的實體資料
     * @returns 新增成功的資料
     */
    public add(entity: TEntity): Promise<TEntity> {

        return this.getRepo().save(entity);
    }

    /**
     * 更新一筆資料
     * @param entity 欲更新的實體資料
     * @returns 更新成功的資料
     */
    public update(entity: TEntity): Promise<TEntity> {

        return this.getRepo().save(entity);
    }

    /**
     * 由 id 取得指定資料
     * @param id 實體資料 pk
     * @returns 實體資料
     */
    public get(id: string | number | Date | ObjectID): Promise<TEntity> {

        return this.getRepo().findOne(id);
    }

    /**
     * 由指定欄位取得單筆實體資料
     * @param conditions 指定過濾欄位
     * @return 實體資料
     */
    public getBy(conditions: FindConditions<TEntity>): Promise<TEntity> {

        return this.getRepo().findOne(conditions);
    }

    /**
     * 刪除一筆資料
     * @param entity 欲刪除的實體資料
     * @returns 刪除成功的資料
     */
    public delete(entity: TEntity): Promise<TEntity> {

        return this.getRepo().remove(entity);
    }

    /**
     * 使用交易機制操作儲存庫
     * @param runInTransaction 交易機制中的操作委派
     * @param {IsolationLevel} [isolationLevel=IsolationLevel.ReadUncommitted] 交易隔離等級
     * @return Promise
     */
    public useTransaction(
        runInTransaction: (entityManager: EntityManager) => Promise<TEntity>,
        isolationLevel: IsolationLevel = IsolationLevel.ReadUncommitted): Promise<TEntity> {

        // TODO 待 typeorm 發布 0.2.8 後傳入參數 isolationLevel
        return this.dbConnection.manager.transaction(runInTransaction);
    }

    /**
     * 使用 sql 語法直接查詢
     * @param rawSql sql 查詢語法
     * @param parameters 參數
     * @return Promise
     */
    public query<TModel>(rawSql: string, parameters?: any[]): Promise<TModel> {

        return this.getRepo().query(rawSql, parameters) as Promise<TModel>;
    }

    /**
     * 取得儲存庫
     * @returns 該實體資料表之儲存庫
     */
    public abstract getRepo(): Repository<TEntity>;
}