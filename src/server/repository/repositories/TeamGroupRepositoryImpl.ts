import {inject, injectable, named} from "inversify";
import {IDbProvider, TeamGroupEntity, ITeamGroupRepository, GenericMongoRepository} from "..";
import {TYPES} from "../../ioc";
import {IExecutionContext} from "../../utils";
import {Repository} from "typeorm";

/**
 * The TeamGroupEntity repository implementation
 */
@injectable()
export class TeamGroupRepositoryImpl extends GenericMongoRepository<TeamGroupEntity> implements ITeamGroupRepository {

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
     * Override getRepo, get the really TeamGroupEntity collection.
     * @returns The repository for specified collection.
     */
    public getRepo(): Repository<TeamGroupEntity> {

        return this.dbConnection.getMongoRepository(TeamGroupEntity) as Repository<TeamGroupEntity>;
    }
}
