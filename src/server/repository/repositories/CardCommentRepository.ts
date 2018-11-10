import {inject, injectable, named} from "inversify";
import {IDbProvider, GenericMongoRepository, CardCommentEntity} from "..";
import {TYPES} from "../../ioc";
import {IExecutionContext} from "../../utils";
import {Repository} from "typeorm";
import {ICardCommentRepository} from "./interfaces/ICardCommentRepository";

/**
 * The CardComment repository implementation
 */
@injectable()
export class CardCommentRepository extends GenericMongoRepository<CardCommentEntity> implements ICardCommentRepository {

    /**
     * constructor
     * @param dbProvider The provider for database
     * @param executionContext IExecutionContext
     */
    public constructor(
        @inject(TYPES.IDbProvider) @named('mongo') dbProvider: IDbProvider,
        @inject(TYPES.IExecutionContext) executionContext: IExecutionContext
    ) {
        super(dbProvider, executionContext);
    }

    /**
     * Override getRepo, get the really CardComment collection.
     * @returns The repository for specified collection.
     */
    public getRepo(): Repository<CardCommentEntity> {

        return this.dbConnection.getMongoRepository(CardCommentEntity) as Repository<CardCommentEntity>;
    }
}
