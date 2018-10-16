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
};

export default registerRepository;
