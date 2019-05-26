import {inject, injectable, named} from "inversify";
import {IDbProvider, KanbanBoardEntity, IKanbanBoardRepository, GenericMongoRepository} from "..";
import {TYPES} from "../../ioc";
import {IExecutionContext} from "../../utils";
import {Repository} from "typeorm";

/**
 * The KanbanBoardEntity repository implementation
 */
@injectable()
export class KanbanBoardRepositoryImpl extends GenericMongoRepository<KanbanBoardEntity> implements IKanbanBoardRepository {

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
     * Override getRepo, get the really KanbanBoardEntity collection.
     * @returns The repository for specified collection.
     */
    public getRepo(): Repository<KanbanBoardEntity> {

        return this.dbConnection.getMongoRepository(KanbanBoardEntity) as Repository<KanbanBoardEntity>;
    }
}
