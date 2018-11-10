import * as Repository from './index';
import {Container} from 'inversify';
import {TYPES} from '../ioc';

/**
 * Register repository layer components.
 * @param container DI container
 */
const registerRepository = (container: Container) => {

    // bind DbProvider
    container.bind<Repository.IDbProvider>(TYPES.IDbProvider).to(Repository.MongoDbProvider).whenTargetNamed('mongo');

    // bind Repository
    container.bind<Repository.IUserRepository>(TYPES.IUserRepository).to(Repository.UserRepositoryImpl);
    container.bind<Repository.IBoardCardRepository>(TYPES.IBoardCardRepository).to(Repository.BoardCardRepositoryImpl);
    container.bind<Repository.IKanbanBoardRepository>(TYPES.IKanbanBoardRepository).to(Repository.KanbanBoardRepositoryImpl);
    container.bind<Repository.ITeamGroupRepository>(TYPES.ITeamGroupRepository).to(Repository.TeamGroupRepositoryImpl);
    container.bind<Repository.ICardCommentRepository>(TYPES.ICardCommentRepository).to(Repository.CardCommentRepository);
    container.bind<Repository.ICardListRepository>(TYPES.ICardListRepository).to(Repository.CardListRepository);
};

export default registerRepository;
