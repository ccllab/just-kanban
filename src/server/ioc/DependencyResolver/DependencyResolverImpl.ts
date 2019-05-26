import {Container} from 'inversify';
import {IDependencyResolver} from './IDependencyResolver';

/**
 * The resolver for dependency component.
 * @singleton
 */
export class DependencyResolverImpl implements IDependencyResolver {

    /**
     * Single instance for resolver.
     */
    private static resolverInstance: DependencyResolverImpl;

    /**
     * DI container
     */
    private containerInstance: Container;

    /**
     * The private constructor.
     */
    private constructor() {
    }

    /**
     * Get resolver instance
     * @returns DependencyResolver
     */
    public static current(): IDependencyResolver {

        return this.resolverInstance || (this.resolverInstance = new this());
    }

    /**
     * Set DI container for resolver.
     * @param container DI container.
     */
    public SetContainer(container: Container): void {

        this.containerInstance = container;
    }

    /**
     * Resolve by specified key.
     * @param resolveKey The specified key.
     * @returns The specified component.
     */
    public Resolve<TService>(resolveKey: string | symbol): TService {

        return this.containerInstance.get<TService>(resolveKey);
    }

    /**
     * Resolve by specified key and name.
     * @param resolveKey The specified key.
     * @param name The specified name.
     * @returns The specified component.
     */
    public ResolveNamed<TService>(resolveKey: string | symbol, name: string): TService {

        return this.containerInstance.getNamed<TService>(resolveKey, name);
    }
}
