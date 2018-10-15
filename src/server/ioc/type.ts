/**
 * Define specified key for interfaces that inject to components.
 */
export const TYPES = {

    // DbProvider
    IDbProvider: Symbol.for('IDbProvider'),

    // Repositories
    IUserRepository: Symbol.for('IUserRepository'),

    // Services
    IAuthService: Symbol.for('IAuthService'),

    // other utils
    ILogger: Symbol.for('ILogger')
};
