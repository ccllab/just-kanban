import {
    DeepPartial,
    EntityManager,
    FindConditions,
    ObjectID,
    Repository
} from 'typeorm';
import {IsolationLevel} from '../..';

/**
 * The interface of base and generic class for repository,
 *
 * Implement CRUD
 * @param <TEntity> Entity type
 */
export interface IGenericRepository<TEntity extends DeepPartial<TEntity>> {

    /**
     * The all entity for specified table(collection)
     * @returns all entity
     */
    getAll(): Promise<TEntity[]>;

    /**
     * Add one entity to table(collection)
     * @param entity The entity for adding
     * @returns The entity that added
     */
    add(entity: TEntity): Promise<TEntity>;

    /**
     * Update one entity to table(collection)
     * @param entity The entity for updating
     * @returns The entity that updated
     */
    update(entity: TEntity): Promise<TEntity>;

    /**
     * Get entity by specified pk
     * @param id pk
     * @returns entity
     */
    get(id: string | number | Date | ObjectID): Promise<TEntity>;

    /**
     * Get entity by specified conditions
     * @param conditions The conditions for filtering
     * @return entity
     */
    getBy(conditions: FindConditions<TEntity>): Promise<TEntity>;

    /**
     * Remove one entity
     * @param entity The entity removing.
     * @returns The entity removed.
     */
    delete(entity: TEntity): Promise<TEntity>;

    /**
     * Get repository for database table(collection)
     * @returns The repository for specified table(collection).
     */
    getRepo(): Repository<TEntity>;

    /**
     * Run operating in database transaction, not support in MongoDB.
     * @param runInTransaction The operating callback
     * @param {IsolationLevel} [isolationLevel=IsolationLevel.ReadUncommitted] The isolation level.
     * @return Promise
     */
    useTransaction(
        runInTransaction: (entityManager: EntityManager) => Promise<TEntity>,
        isolationLevel?: IsolationLevel): Promise<TEntity>;

    /**
     * Querying in raw sql
     * @param rawSql sql statement
     * @param parameters The parameter for raw sql.
     * @return Promise
     */
    query<TModel>(rawSql: string, parameters?: any[]): Promise<TModel>;
}
