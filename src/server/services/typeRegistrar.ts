import * as services from './index';
import {Container} from "inversify";
import {TYPES} from "../ioc";

/**
 * Register service layer components
 * @param container DI container
 */
const registerServices = (container: Container) => {

    container.bind<services.IAuthService>(TYPES.IAuthService).to(services.AuthServiceImpl);
};

export default registerServices;
