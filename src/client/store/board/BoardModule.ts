import {ActionTree, Commit, GetterTree, Module, MutationTree} from "vuex";
import {
    addCommentToCurrentCardParameters,
    AddNewCarParameters,
    BoardList,
    BoardListItem,
    BoardState,
    CardList,
    CardLists, CreateCardParameters, CreateCommentParameters,
    DragCardParameters,
    IsAssignedCardFunc,
    types, updateCardInListParameters, UpdateCardParameters
} from "./types";
import {RootState} from "../types";
import {Board} from "../../models/Board.model";
import {User} from "../../models/User.model";
import {types as authTypes} from "../auth/types";
import {Card} from "../../models/Card.model";
import {AuthApi, BoardApi, CardApi, CardListApi} from "../../api";
import * as _ from "lodash";

export default class BoardModule implements Module<BoardState, RootState> {

    public namespaced = false;

    public state: BoardState = {
        boardList: [],
        displayedBoard: null,
        cardLists: [],
        displayedCard: null,
        queryedUser: null
    };

    public getters: GetterTree<BoardState, RootState> = {
        [types.BOARD_LIST](state): BoardList {

            return state.boardList || [];
        },

        [types.CURRENT_BOARD](state): Board {

            return state.displayedBoard || null;
        },

        [types.IS_ADMIN](state, getters): boolean {
            let user: User = getters[authTypes.USER];

            return state.displayedBoard.admins.findIndex(u => u.userId === user.userId) !== -1;
        },

        [types.QUERYED_USER](state): User {

            return state.queryedUser || null;
        },

        [types.CARD_LISTS](state): CardLists {

            return state.cardLists || [];
        },

        [types.CURRENT_CARD](state): Card {

            return state.displayedCard || null;
        },

        [types.IS_ASSIGNED_CARD](state, getters): IsAssignedCardFunc {
            return (card: Card) => {
                let user: User = getters[authTypes.USER];

                return card.assignedUser.userId === user.userId;
            };
        }
    };

    public actions: ActionTree<BoardState, RootState> = {
        /**
         * 取得看板列表
         * @param param0
         */
        async [types.GET_BOARD_LIST]({ commit }): Promise<boolean> {
            let resData = await BoardApi.getBoardList();

            if (resData.result) {
                let boardList: BoardList = resData.array;
                commit(types.SET_BOARD_LIST, boardList);

                return true;
            } else {
                commit(types.SET_BOARD_LIST , []);

                return false;
            }
        },

        /**
         * 取得當前看板內容資訊（不包含卡片列表）
         * @param param0
         * @param boardId
         */
        async [types.GET_BOARD_INFO]({ commit }, boardId: string): Promise<boolean> {
            let resData = await BoardApi.getBoardInfo(boardId);

            if (resData.result) {
                let board: Board = _.pick(resData, ['_id', 'boardName', 'admins', 'members']);
                commit(types.SET_CURRENT_BOARD, board);

                return true;
            } else {
                commit(types.SET_CURRENT_BOARD, null);

                return false;
            }
        },

        /**
         * 創建看板
         * @param param0
         * @param boardName Board Name
         */
        async [types.CREATE_BOARD]({ commit }, boardName: string): Promise<boolean> {
            let resData = await BoardApi.createBoard({ boardName });

            if (resData.result) {
                let boardListItem: BoardListItem = _.pick(resData, ['_id', 'boardName', 'isAdmin']);
                commit(types.INSERT_BOARD_TO_LIST, boardListItem);

                return true;
            } else {

                return false;
            }
        },

        /**
         * 用 email 查詢使用者並將其暫時放置 board member list
         * 需要執行更新 board api 才會寫入資料庫
         * @param param0
         * @param email
         */
        async [types.QUERY_USER]({ commit }, email: string): Promise<boolean> {
            let resData = await AuthApi.queryUserInfo({ email });

            if (resData.result) {
                let user: User = _.pick(resData, ['userId', 'username', 'email']);
                commit(types.SET_QUERYED_USER, user);

                return true;
            } else {

                return false;
            }
        },

        /**
         * 更新指定看板內容
         * @param param0
         * @param board
         */
        async [types.UPDATE_BOARD]({ commit, state }, board: Board): Promise<boolean> {
            let resData = await BoardApi.updateBoard(board._id, {
                boardName: board.boardName,
                admins: {
                    insert: _.differenceWith(board.admins, state.displayedBoard.admins, _.isEqual).map(user => user.userId),
                    remove: _.differenceWith(state.displayedBoard.admins, board.admins, _.isEqual).map(user => user.userId)
                },
                members: {
                    insert: _.differenceWith(board.members, state.displayedBoard.members, _.isEqual).map(user => user.userId),
                    remove: _.differenceWith(state.displayedBoard.members, board.members, _.isEqual).map(user => user.userId)
                }
            });

            if (resData.result) {
                let _board: Board = _.pick(resData, ['_id', 'boardName', 'admins', 'members']);
                commit(types.SET_CURRENT_BOARD, _board);

                return true;
            } else {

                return false;
            }
        },

        /**
         * 取得卡片列表（包含卡片分類類別）
         * @param param0
         * @param boardId
         */
        async [types.GET_CARD_LISTS]({ commit }, boardId: string): Promise<boolean> {
            let resData = await CardListApi.getCardLists(boardId);

            if (resData.result) {
                let cardLists: CardLists = resData.array;
                commit(types.SET_CARD_LISTS, cardLists);

                return true;
            } else {
                commit(types.SET_CARD_LISTS, []);

                return false;
            }
        },

        /**
         * 創建看板的卡片分類列表
         * @param param0
         * @param cardListName
         */
        async [types.CREATE_CARD_LIST]({ state, commit, dispatch }, cardListName: string): Promise<boolean> {
            let currentBoarId = state.displayedBoard._id;
            let resData = await CardListApi.createCardList(currentBoarId, { cardListName });

            if (resData.result) {
                let cardList: CardList = {
                    ..._.pick(resData, ['_id', 'name']),
                    cards: []
                };
                commit(types.ADD_NEW_CARD_LIST, cardList);

                return true;
            } else {
                // 新增卡片列表失敗，重新向 Server 取得卡片列表及卡片資料
                dispatch(types.GET_CARD_LISTS, currentBoarId);

                return false;
            }
        },

        /**
         * 取得指定卡片詳細內容
         * @param param0
         * @param cardId
         */
        async [types.GET_CARD_INFO]({ commit }, cardId: string): Promise<boolean> {
            let resData = await CardApi.getCardInfo(cardId);

            if (resData.result) {
                let card: Card = {
                    _id: cardId,
                    ..._.pick(resData, ['title', 'description', 'assignedUser', 'comments'])
                };
                commit(types.SET_CURRENT_CARD, card);

                return true;
            } else {
                commit(types.SET_CURRENT_CARD, null);

                return false;
            }
        },

        /**
         * 更新卡片所屬類別
         * @param param0
         * @param param
         */
        async [types.DRAG_CARD]({ state, commit, dispatch }, param: DragCardParameters): Promise<boolean> {
            commit(types.UPDATE_CARD_LISTS, param);
            let currentBoarId = state.displayedBoard._id;
            let resData = await CardListApi.cardChangeStatus({
                source: {
                    _id: param.srcListId,
                    cards: state.cardLists.find(list => list._id === param.srcListId).cards.map(card => card._id)
                },
                destination: {
                    _id: param.dstListId,
                    cards: state.cardLists.find(list => list._id === param.dstListId).cards.map(card => card._id)
                }
            });

            if (resData.result) {

                return true;
            } else {
                // 新增卡片列表失敗，重新向 Server 取得卡片列表及卡片資料
                dispatch(types.GET_CARD_LISTS, currentBoarId);

                return false;
            }
        },

        /**
         * 新增卡片
         * @param param0
         * @param payload
         */
        async [types.CREATE_CARD]({ commit }, param: CreateCardParameters): Promise<boolean> {
            let resData = await CardApi.createCard(param);

            if (resData.result) {
                let card: Card = {
                    ..._.pick(resData, ['_id', 'title', 'assignedUser'])
                };
                let mutationsParam: AddNewCarParameters = {
                    listId: param.listId,
                    card
                };
                commit(types.ADD_NEW_CARD, mutationsParam);

                return true;
            } else {

                return false;
            }
        },

        /**
         * 更新指定的卡片內容
         * 若更新成功，會更改在卡片列表內的該卡片資訊
         * @param param0
         * @param param
         */
        async [types.UPDATE_CARD]({ commit }, param: UpdateCardParameters): Promise<boolean> {
            let reqParam = _.pick(param, ['listId', 'title', 'description', 'assignedUserId']);
            let resData = await CardApi.updateCard(param._id, reqParam);

            if (resData.result) {
                let card: Card = _.pick(resData, ['_id', 'title', 'description', 'assignedUser']);
                let mutationsParam: updateCardInListParameters = {
                    listId: param.listId,
                    cardId: param._id,
                    title: param.title,
                    assignedUserId: param.assignedUserId
                };
                commit(types.SET_CURRENT_CARD, card);
                commit(types.UPDATE_CARD_IN_LIST, mutationsParam);
            } else {

                return false;
            }
        },

        /**
         * 新增卡片留言
         * @param param0
         * @param param
         */
        async [types.CREATE_COMMENT]({ commit }, param: CreateCommentParameters): Promise<boolean> {
            let resData = await CardApi.createCardComment(param.cardId, {
                content: param.content
            });

            if (resData.result) {
                let mutationsParam: addCommentToCurrentCardParameters = {
                    _id: resData._id,
                    content: resData.content
                };
                commit(types.ADD_COMMENT_TO_CURRENT_CARD, mutationsParam);

                return true;
            } else {

                return false;
            }
        }
    };

    public mutations: MutationTree<BoardState> = {
        [types.SET_BOARD_LIST](state, payload: BoardList): void {
            state.boardList = payload || [];
        },

        [types.INSERT_BOARD_TO_LIST](state, payload: BoardListItem): void {
            state.boardList || (state.boardList = []);
            state.boardList.push(payload);
        },

        [types.SET_CURRENT_BOARD](state, payload: Board): void {
            state.displayedBoard = payload || null;
        },

        [types.SET_QUERYED_USER](state, payload: User): void {
            state.queryedUser = payload;
        },

        [types.SET_CARD_LISTS](state, payload: CardLists): void {
            state.cardLists = payload || null;
        },

        [types.ADD_NEW_CARD_LIST](state, payload: CardList) {
            state.cardLists || (state.cardLists = []);
            state.cardLists.push(payload);
        },

        [types.SET_CURRENT_CARD](state, payload: Card): void {
            state.displayedCard = _.assign(state.displayedCard, payload);
        },

        [types.UPDATE_CARD_LISTS](state, payload: DragCardParameters): void {
            let srcList = state.cardLists.find(list => list._id === payload.srcListId);
            let dstList = state.cardLists.find(list => list._id === payload.dstListId);
            let card = srcList.cards.find(card => card._id === payload.cardId);
            _.pullAllWith(srcList.cards, [card], _.isEqual);
            dstList.cards.splice(payload.dstIndex, 0, card);
        },

        [types.ADD_NEW_CARD](state, payload: AddNewCarParameters): void {
            let list = state.cardLists.find(list => list._id === payload.listId);
            if (!list) return;
            list.cards.push(payload.card);
        },

        [types.UPDATE_CARD_IN_LIST](state, payload: updateCardInListParameters): void {
            let list = state.cardLists.find(list => list._id === payload.listId);
            if (!list) return;
            let card = list.cards.find(card => card._id === payload.cardId);
            if (!card) return;
            card.title = payload.title;
            card.assignedUser.userId = payload.assignedUserId;
            card.assignedUser.username = '';
        },

        [types.ADD_COMMENT_TO_CURRENT_CARD](state, payload: addCommentToCurrentCardParameters): void {
            let card = state.displayedCard;
            if (!card) return;

            card.comments.push(payload);
        }
    };
}