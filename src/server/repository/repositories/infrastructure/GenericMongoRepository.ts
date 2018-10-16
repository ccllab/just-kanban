import {decrypt} from "typeorm-encrypted";
import {DeepPartial, FindConditions, ObjectID, Repository} from "typeorm";
import {GenericRepositoryImpl} from "./GenericRepositoryImpl";
import {hasEditColumn} from "../../../utils/extensions/typeExtensions";
import {IDbProvider} from "../..";
import {IExecutionContext} from "../../../utils";
import {injectable} from "inversify";

/**
 * The generic MongoDB repository
 *
 * Override get and getBy, cause DbSubscriber can't catch afterLoad event.
 */
@injectable()
export abstract class GenericMongoRepository<TEntity extends DeepPartial<TEntity>> extends GenericRepositoryImpl<TEntity> {

    /**
     * constructor
     * @param dbProvider The provider for database
     * @param executionContext IExecutionContext
     */
    protected constructor(
        dbProvider: IDbProvider,
        private readonly executionContext: IExecutionContext
    ) {
        super(dbProvider);
    }

    /**
     * Add one entity to table(collection)
     * @param entity The entity for adding
     * @returns The entity that added
     */
    public add(entity: TEntity): Promise<TEntity> {
        if (hasEditColumn(entity)) {
            entity.createdAt = this.executionContext.dateNow;
            entity.updatedAt = this.executionContext.dateNow;
        }

        return super.add(entity);
    }

    /**
     * Update one entity to table(collection)
     * @param entity The entity for updating
     * @returns The entity that updated
     */
    public update(entity: TEntity): Promise<TEntity> {
        if (hasEditColumn(entity)) {
            entity.createdAt = this.executionContext.dateNow;
            entity.updatedAt = this.executionContext.dateNow;
        }

        return super.add(entity);
    }

    /**
     * Get entity by specified pk
     * @param id pk
     * @returns entity
     */
    public get(id: string | number | Date | ObjectID): Promise<TEntity> {

        return this.getRepo().findOne(id)
            .then(async (foundEntity: TEntity | any | undefined) => {
                if (foundEntity) {

                    // decrypt columns that decorated with encrypt
                    await decrypt(foundEntity);
                }

                return foundEntity;
            })
            .catch((err) => {
                throw err;
            });
    }

    /**
     * Get entity by specified conditions
     * @param conditions The conditions for filtering
     * @return entity
     */
    public getBy(conditions: FindConditions<TEntity>): Promise<TEntity> {

        return this.getRepo().findOne(conditions)
            .then(async (foundEntity: TEntity | any | undefined) => {
                if (foundEntity) {

                    // decrypt columns that decorated with encrypt
                    await decrypt(foundEntity);
                }

                return foundEntity;
            })
            .catch((err) => {
                throw err;
            });
    }


    /**
     * Get repository for MongoDB collection
     * @returns The repository for MongoDB collection
     */
    public abstract getRepo(): Repository<TEntity>;
}
