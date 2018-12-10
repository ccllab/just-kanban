import * as services from './index';
import {Container} from "inversify";
import {TYPES} from "../ioc";

/**
 * Register service layer components
 * @param container DI container
 */
const registerServices = (container: Container) => {

    container.bind<services.IAuthService>(TYPES.IAuthService).to(services.AuthServiceImpl);
    container.bind<services.IBoardService>(TYPES.IBoardService).to(services.BoardServiceImpl);
    container.bind<services.ICardListService>(TYPES.ICardListService).to(services.CardListServiceImpl);
    container.bind<services.ICardService>(TYPES.ICardService).to(services.CardServiceImpl);
    container.bind<services.ICardCommentService>(TYPES.ICardCommentService).to(services.CardCommentServiceImpl);
};

export default registerServices;
