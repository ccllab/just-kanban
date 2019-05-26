import { MutationTree } from 'vuex';
import * as _ from 'lodash';
import { Board } from '../../models/Board.model';
import { 
  BoardState, 
  BoardList,
  BoardListItem, 
  CardList,
  CardLists,
  DragCardParameters,
  AddNewCarParameters,
  updateCardInListParameters,
  addCommentToCurrentCardParameters,
  types } from './types';
import { Card } from '../../models/Card.model';
import { User } from '../../models/User.model';

export const mutations: MutationTree<BoardState> = {
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