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
 * The base and generic class for repository,
 *
 * Implement CRUD
 * @param <TEntity> Entity type
 */
@injectable()
export abstract class GenericRepositoryImpl<TEntity extends DeepPartial<TEntity>> implements IGenericRepository<TEntity> {

    /**
     * db connection
     */
    protected dbConnection: Connection;

    /**
     * constructor
     * @param dbProvider The provider for database
     */
    protected constructor(dbProvider: IDbProvider) {

        this.dbConnection = dbProvider.getDb();
    }

    /**
     * The all entity for specified table(collection)
     * @returns all entity
     */
    public getAll(): Promise<TEntity[]> {

        return this.getRepo().find();
    }

    /**
     * Add one entity to table(collection)
     * @param entity The entity for adding
     * @returns The entity that added
     */
    public add(entity: TEntity): Promise<TEntity> {

        return this.getRepo().save(entity);
    }

    /**
     * Update one entity to table(collection)
     * @param entity The entity for updating
     * @returns The entity that updated
     */
    public update(entity: TEntity): Promise<TEntity> {

        return this.getRepo().save(entity);
    }

    /**
     * Get entity by specified pk
     * @param id pk
     * @returns entity
     */
    public get(id: string | number | Date | ObjectID): Promise<TEntity> {

        return this.getRepo().findOne(id);
    }

    /**
     * Get entity by specified conditions
     * @param conditions The conditions for filtering
     * @return entity
     */
    public getBy(conditions: FindConditions<TEntity>): Promise<TEntity> {

        return this.getRepo().findOne(conditions);
    }

    /**
     * Remove one entity
     * @param entity The entity removing.
     * @returns The entity removed.
     */
    public delete(entity: TEntity): Promise<TEntity> {

        return this.getRepo().remove(entity);
    }

    /**
     * Run operating in database transaction, not support in MongoDB.
     * @param runInTransaction The operating callback
     * @param {IsolationLevel} [isolationLevel=IsolationLevel.ReadUncommitted] The isolation level.
     * @return Promise
     */
    public useTransaction(
        runInTransaction: (entityManager: EntityManager) => Promise<TEntity>,
        isolationLevel: IsolationLevel = IsolationLevel.ReadUncommitted): Promise<TEntity> {

        // todo wait for typeorm 0.2.8, then pass isolation level to transaction()
        return this.dbConnection.manager.transaction(runInTransaction);
    }

    /**
     * Querying in raw sql
     * @param rawSql sql statement
     * @param parameters The parameter for raw sql.
     * @return Promise
     */
    public query<TModel>(rawSql: string, parameters?: any[]): Promise<TModel> {

        return this.getRepo().query(rawSql, parameters) as Promise<TModel>;
    }

    /**
     * Get repository for database table(collection)
     * @returns The repository for specified table(collection).
     */
    public abstract getRepo(): Repository<TEntity>;
}
