import {Container} from 'inversify';
import {TYPES} from '../ioc';
import * as Repository from './index';

/**
 * 註冊儲存庫層之類型
 * @param container DI 容器
 */
const registerRepository = (container: Container) => {

    // bind DbProvider
    container.bind<Repository.IDbProvider>(TYPES.IDbProvider).to(Repository.MongoDbProvider).whenTargetNamed('mongo');

    // bind Repository
    container.bind<Repository.IUserRepository>(TYPES.IUserRepository).to(Repository.UserRepositoryImpl);
};

export default registerRepository;