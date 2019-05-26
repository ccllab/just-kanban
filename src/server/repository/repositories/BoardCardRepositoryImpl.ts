import {inject, injectable, named} from "inversify";
import {BoardCardEntity, IDbProvider, IBoardCardRepository, GenericMongoRepository} from "..";
import {TYPES} from "../../ioc";
import {IExecutionContext} from "../../utils";
import {Repository} from "typeorm";

/**
 * The board card repository implementation
 */
@injectable()
export class BoardCardRepositoryImpl extends GenericMongoRepository<BoardCardEntity> implements IBoardCardRepository {

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
     * Override getRepo, get the really board card collection.
     * @returns The repository for specified collection.
     */
    public getRepo(): Repository<BoardCardEntity> {

        return this.dbConnection.getMongoRepository(BoardCardEntity) as Repository<BoardCardEntity>;
    }
}
