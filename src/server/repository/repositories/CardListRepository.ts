import {inject, injectable, named} from "inversify";
import {IDbProvider, GenericMongoRepository, CardListEntity} from "..";
import {TYPES} from "../../ioc";
import {IExecutionContext} from "../../utils";
import {Repository} from "typeorm";
import {ICardListRepository} from "./interfaces/ICardListRepository";

/**
 * The CardList repository implementation
 */
@injectable()
export class CardListRepository extends GenericMongoRepository<CardListEntity> implements ICardListRepository {

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
     * Override getRepo, get the really CardList collection.
     * @returns The repository for specified collection.
     */
    public getRepo(): Repository<CardListEntity> {

        return this.dbConnection.getMongoRepository(CardListEntity) as Repository<CardListEntity>;
    }
}
