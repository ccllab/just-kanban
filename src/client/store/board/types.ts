import { userId, User } from '../../models/User.model'
import { Board } from '../../models/Board.model'
import { Card } from '../../models/Card.model'

export interface BoardState {
  boardList: BoardList,
  displayedBoard: Board,
  cardLists: CardLists
  displayedCard: Card,
  queryedUser: User
}

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

// Mutations Functions Prameters
export type AddNewCarParameters = {
  listId: string,
  card: Card
}
export type updateCardInListParameters = {
  listId: string,
  cardId: string,
  title: string,
  assignedUserId: userId
}
export type addCommentToCurrentCardParameters = {
  _id: string
  content: string
}

// Actions Functions Parameters
export type DragCardParameters = {
  cardId: string
  srcListId: string,
  dstListId: string,
  dstIndex: number
}
export type CreateCardParameters = {
  listId: string,
  title: string,
  description: string,
  assignedUserId: string
}
export type UpdateCardParameters = {
  _id: string,
  listId: string,
  title: string,
  description: string,
  assignedUserId: string
}
export type CreateCommentParameters = {
  cardId: string,
  content: string
}

// Actions Functions
export type GetBoardListFunc = () => Promise<boolean>
export type GetBoardInfoFunc = (boardId: string) => Promise<boolean>
export type CreateBoardFunc = (boardName: string) => Promise<boolean>
export type QueryUserFunc = (email: string) => Promise<boolean>
export type UpdateBoardFunc = (board: Board) => Promise<boolean>
export type GetCardListsFunc = (boardId: string) => Promise<boolean>
export type CreateCardListsFunc = (listName: string) => Promise<boolean>
export type GetCardInfoFunc = (cardId: string) => Promise<boolean>
export type DragCardFunc = (param: DragCardParameters) => Promise<boolean>
export type CreateCardFunc = (param: CreateCardParameters) => Promise<boolean>
export type UpdateCardFunc = (param: UpdateCardParameters) => Promise<boolean>
export type CreateCommentFunc = (param: CreateCommentParameters) => Promise<boolean>

// Getters Functions
export type IsAssignedCardFunc = (card: Card) => boolean

export const types = {
  // actions 
  GET_BOARD_LIST: 'getBoardList',
  GET_BOARD_INFO: 'getBoardInfo',
  CREATE_BOARD: 'createBoard',
  UPDATE_BOARD: 'updateBoard',
  QUERY_USER: 'queryUser',
  GET_CARD_LISTS: 'getCardList',
  CREATE_CARD_LIST: 'createCardList',
  GET_CARD_INFO: 'getCardInfo',
  DRAG_CARD: 'dragCard',
  CREATE_CARD: 'createCard',
  UPDATE_CARD: 'updateCard',
  CREATE_COMMENT: 'createComment',

  // getters
  BOARD_LIST: 'boardList',
  CURRENT_BOARD: 'currentBoard',
  IS_ADMIN: 'isAdmin',
  CARD_LISTS: 'cardLists',
  CURRENT_CARD: 'currentCard',
  IS_ASSIGNED_CARD: 'isAssignedCard',
  QUERYED_USER: 'queryedUser',

  // mutations
  SET_BOARD_LIST: 'setBoardList',
  INSERT_BOARD_TO_LIST: 'insertBoardToList',
  SET_CURRENT_BOARD: 'setCurrentBoard',
  SET_QUERYED_USER: 'setQueryedUser',
  SET_CARD_LISTS: 'setCardList',
  ADD_NEW_CARD_LIST: 'addNewCardList',
  UPDATE_CARD_LISTS: 'updateCardLists',
  SET_CURRENT_CARD: 'setCurrentCard',
  ADD_NEW_CARD: 'addNewCard',
  UPDATE_CARD_IN_LIST: 'updateCardInList',
  ADD_COMMENT_TO_CURRENT_CARD: 'addComment2CurrentCard'
}
