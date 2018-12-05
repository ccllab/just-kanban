/**
 * Define specified key for interfaces that inject to components.
 */
export const TYPES = {

    // DbProvider
    IDbProvider: Symbol.for('IDbProvider'),

    // Repositories
    IUserRepository: Symbol.for('IUserRepository'),
    IBoardCardRepository: Symbol.for('IBoardCardRepository'),
    ITeamGroupRepository: Symbol.for('ITeamGroupRepository'),
    IKanbanBoardRepository: Symbol.for('IKanbanBoardRepository'),
    ICardListRepository: Symbol.for('ICardListRepository'),
    ICardCommentRepository: Symbol.for('ICardCommentRepository'),

    // Services
    IAuthService: Symbol.for('IAuthService'),
    IBoardService: Symbol.for('IBoardService'),

    // other utils
    ILogger: Symbol.for('ILogger'),
    IExecutionContext: Symbol.for('IExecutionContext')
};
