/**
 * 定義依賴注入的類型符號
 */
export const TYPES = {

    // Database
    IDbProvider: Symbol.for('IDbProvider'),

    // Repository
    IUserRepository: Symbol.for('IUserRepository'),

    // Services
    IAuthService: Symbol.for('IAuthService'),

    // other utils
    ILogger: Symbol.for('ILogger')
};