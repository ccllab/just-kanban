import registerRepository from '../repository/typeRegistrar';
import registerServices from "../services/typeRegistrar";
import registerUtil from '../utils/typeRegistrar';
import {Container} from 'inversify';

/**
 * Inversify DI container factory
 * @singleton
 */
export class InversifyContainerFactory {

    /**
     * The single instance for InversifyContainerFactory
     */
    private static containerFactoryInstance: InversifyContainerFactory;

    /**
     * DI container
     */
    public container: Container;

    /**
     * The private constructor, build container here
     */
    private constructor() {

        this.container = new Container();

        // register repositories
        registerRepository(this.container);

        // register services
        registerServices(this.container);

        // register utils
        registerUtil(this.container);
    }

    /**
     * Get InversifyContainerFactory instance.
     * @returns InversifyContainerFactory
     */
    public static getInstance(): InversifyContainerFactory {

        return this.containerFactoryInstance || (this.containerFactoryInstance = new this());
    }
}
