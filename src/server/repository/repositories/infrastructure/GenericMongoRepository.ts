import {GenericRepositoryImpl} from "./GenericRepositoryImpl";
import {injectable} from "inversify";
import {IDbProvider} from "../..";
import {DeepPartial, FindConditions, ObjectID, Repository} from "typeorm";
import {decrypt} from "typeorm-encrypted";

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
     */
    protected constructor(dbProvider: IDbProvider) {
        super(dbProvider);
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
