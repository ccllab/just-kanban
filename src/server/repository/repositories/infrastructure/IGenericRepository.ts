import {
    DeepPartial,
    EntityManager,
    FindConditions,
    ObjectID,
    Repository
} from 'typeorm';
import {IsolationLevel} from '../..';

/**
 * 泛型資料儲存庫介面
 * @param <TEntity> 實體資料型別
 */
export interface IGenericRepository<TEntity extends DeepPartial<TEntity>> {

    /**
     * 取得該表所有資料
     */
    getAll(): Promise<TEntity[]>;

    /**
     * 新增一筆資料
     * @param entity 欲新增的實體資料
     * @returns 新增成功的資料
     */
    add(entity: TEntity): Promise<TEntity>;

    /**
     * 更新一筆資料
     * @param entity 欲更新的實體資料
     * @returns 更新成功的資料
     */
    update(entity: TEntity): Promise<TEntity>;

    /**
     * 由 id 取得實體資料
     * @param id 實體資料 pk
     * @returns 實體資料
     */
    get(id: string | number | Date | ObjectID): Promise<TEntity>;

    /**
     * 由指定欄位取得單筆實體資料
     * @param conditions 指定過濾欄位
     * @return 實體資料
     */
    getBy(conditions: FindConditions<TEntity>): Promise<TEntity>;

    /**
     * 刪除一筆資料
     * @param entity 欲刪除的實體資料
     * @returns 刪除成功的資料
     */
    delete(entity: TEntity): Promise<TEntity>;

    /**
     * 取得儲存庫
     * @returns 該實體資料表之儲存庫
     */
    getRepo(): Repository<TEntity>;

    /**
     * 使用交易機制操作儲存庫
     * @param runInTransaction 交易機制中的操作委派
     * @param {IsolationLevel} [isolationLevel=IsolationLevel.ReadUncommitted] 交易隔離等級
     */
    useTransaction(
        runInTransaction: (entityManager: EntityManager) => Promise<TEntity>,
        isolationLevel?: IsolationLevel): Promise<TEntity>;

    /**
     * 使用 sql 語法直接查詢
     * @param rawSql sql 查詢語法
     * @param parameters 參數
     */
    query<TModel>(rawSql: string, parameters?: any[]): Promise<TModel>;
}