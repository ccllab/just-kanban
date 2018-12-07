import { Board } from '../../models/Board.model'
import { Card } from '../../models/Card.model'

export type BoardListItem = {
  _id: string,
  boardName: string,
  isAdmin: boolean
}
export type BoardList = BoardListItem[]
export type CardList = {
  _id: string,
  name: string,
  cards: Card[]
}
export type CardLists = CardList[]
export interface BoardState {
  boardList: BoardList,
  displayedBoard: Board,
  cardLists: CardLists
  displayedCard: Card
}

// Actions Functions Parameters
export type DragCardParameters = {
  cardId: string
  srcListId: string,
  dstListId: string,
  dstIndex: number
}

// Actions Functions
export type GetBoardListFunc = () => Promise<boolean>
export type GetBoardInfoFunc = (boardId: string) => Promise<boolean>
export type CreateBoardFunc = (boardName: string) => Promise<boolean>
export type UpdateBoardFunc = (board: Board) => Promise<boolean>
export type GetCardListsFunc = (boardId: string) => Promise<boolean>
export type CreateCardListsFunc = (listName: string) => Promise<boolean>
export type GetCardInfoFunc = (cardId: string) => Promise<boolean>
export type DragCardFunc = (param: DragCardParameters) => Promise<boolean>

// Getters Functions
export type IsAssignedCardFunc = (card: Card) => boolean


export const types = {
  // actions 
  GET_BOARD_LIST: 'getBoardList',
  GET_BOARD_INFO: 'getBoardInfo',
  CREATE_BOARD: 'createBoard',
  UPDATE_BOARD: 'updateBoard',
  GET_CARD_LISTS: 'getCardList',
  CREATE_CARD_LIST: 'createCardList',
  GET_CARD_INFO: 'getCardInfo',
  DRAG_CARD: 'dragCard',

  GET_FAKE_BOARD_LIST: 'getFakeBoardList',
  GET_FAKE_BOARD_INFO: 'getFakeBoardInfo',
  CREATE_FAKE_BOARD: 'createFakeBoard',
  GET_FAKE_CARD_LISTS: 'getFakeCardLists',
  CREATE_FAKE_CARD_LIST: 'createFakeCardList',

  // getters
  BOARD_LIST: 'boardList',
  CURRENT_BOARD: 'currentBoard',
  IS_ADMIN: 'isAdmin',
  CARD_LISTS: 'cardLists',
  CURRENT_CARD: 'currentCard',
  IS_ASSIGNED_CARD: 'isAssignedCard',

  // mutations
  SET_BOARD_LIST: 'setBoardList',
  INSERT_BOARD_TO_LIST: 'insertBoardToList',
  SET_CURRENT_BOARD: 'setCurrentBoard',
  SET_CARD_LISTS: 'setCardList',
  ADD_NEW_CARD_LIST: 'addNewCardList',
  SET_CURRENT_CARD: 'setCurrentCard',
  UPDATE_CARD_LISTS: 'updateCardLists'
}
