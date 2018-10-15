import {Container} from 'inversify';

/**
 * The interface of resolver for dependency component.
 */
export interface IDependencyResolver {

    /**
     * Set DI container for resolver.
     * @param container DI container.
     */
    SetContainer(container: Container): void;

    /**
     * Resolve by specified key.
     * @param resolveKey The specified key.
     * @returns The specified component.
     */
    Resolve<TService>(resolveKey: string | symbol): TService;

    /**
     * Resolve by specified key and name.
     * @param resolveKey The specified key.
     * @param name The specified name.
     * @returns The specified component.
     */
    ResolveNamed<TService>(resolveKey: string | symbol, name: string): TService;
}
