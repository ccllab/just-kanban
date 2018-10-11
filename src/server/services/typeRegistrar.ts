import {Container} from "inversify";
import * as services from './index';
import {TYPES} from "../ioc";

/**
 * 註冊服務層之類型
 * @param container DI 容器
 */
const registerServices = (container: Container) => {

    container.bind<services.IAuthService>(TYPES.IAuthService).to(services.AuthServiceImpl);
};

export default registerServices;