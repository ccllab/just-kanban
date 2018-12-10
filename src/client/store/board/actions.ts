import { ActionTree } from 'vuex'
import * as _ from 'lodash'

import { Board } from '../../models/Board.model';
import { Card } from '../../models/Card.model';
import { User } from '../../models/User.model'
import { BoardApi, CardListApi, CardApi, AuthApi } from '../../api'
import { RootState } from '../types'
import { 
  BoardState,
  BoardList,
  BoardListItem,
  CardList,
  CardLists,
  DragCardParameters,
  CreateCardParameters,
  AddNewCarParameters,
  UpdateCardParameters,
  updateCardInListParameters,
  CreateCommentParameters,
  addCommentToCurrentCardParameters,
  types
} from './types'

export const actions: ActionTree<BoardState, RootState> = {
  /**
   * 取得看板列表
   * @param param0 
   */
  async [types.GET_BOARD_LIST]({ commit }): Promise<boolean> {
    let resData = await BoardApi.getBoardList()

    if (resData.result) {
      let boardList: BoardList = resData.array
      commit(types.SET_BOARD_LIST, boardList)
      return true
    } else {
      commit(types.SET_BOARD_LIST , [])
      return false
    }
  },

  /**
   * 取得當前看板內容資訊（不包含卡片列表）
   * @param param0 
   * @param boardId 
   */
  async [types.GET_BOARD_INFO]({ commit }, boardId: string): Promise<boolean> {
    let resData = await BoardApi.getBoardInfo(boardId)

    if (resData.result) {
      let board: Board = _.pick(resData, ['_id', 'boardName', 'admins', 'members'])
      commit(types.SET_CURRENT_BOARD, board)
      return true
    } else {
      commit(types.SET_CURRENT_BOARD, null)
      return false
    }
  },

  /**
   * 創建看板
   * @param param0 
   * @param boardName Board Name
   */
  async [types.CREATE_BOARD]({ commit }, boardName: string): Promise<boolean> {
    let resData = await BoardApi.createBoard({ boardName })

    if (resData.result) {
      let boardListItem: BoardListItem = _.pick(resData, ['_id', 'boardName', 'isAdmin'])
      commit(types.INSERT_BOARD_TO_LIST, boardListItem)
      return true
    } else {
      return false
    }
  },

  /**
   * 用 email 查詢使用者並將其暫時放置 board member list
   * 需要執行更新 board api 才會寫入資料庫
   * @param param0 
   * @param email 
   */
  async [types.QUERY_USER]({ commit }, email: string): Promise<boolean> {
    let resData = await AuthApi.queryUserInfo({ email })

    if (resData.result) {
      let user: User = _.pick(resData, ['userId', 'username', 'email'])
      commit(types.SET_QUERYED_USER, user)
      return true
    } else {
      return false
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
    })

    if (resData.result) {
      let _board: Board = _.pick(resData, ['_id', 'boardName', 'admins', 'members'])
      commit(types.SET_CURRENT_BOARD, _board)
      return true
    } else {
      return false
    }
  },

  /**
   * 取得卡片列表（包含卡片分類類別）
   * @param param0 
   * @param boardId 
   */
  async [types.GET_CARD_LISTS]({ commit }, boardId: string): Promise<boolean> {
    let resData = await CardListApi.getCardLists(boardId)

    if (resData.result) {
      let cardLists: CardLists = resData.array
      commit(types.SET_CARD_LISTS, cardLists)
      return true
    } else {
      commit(types.SET_CARD_LISTS, [])
      return false
    }
  },

  /**
   * 創建看板的卡片分類列表
   * @param param0 
   * @param cardListName 
   */
  async [types.CREATE_CARD_LIST]({ state, commit, dispatch }, cardListName: string): Promise<boolean> {
    let currentBoarId = state.displayedBoard._id
    let resData = await CardListApi.createCardList(currentBoarId, { cardListName })

    if (resData.result) {
      let cardList: CardList = {
        ..._.pick(resData, ['_id', 'name']),
        cards: []
      }
      commit(types.ADD_NEW_CARD_LIST, cardList)
      return true
    } else {
      // 新增卡片列表失敗，重新向 Server 取得卡片列表及卡片資料
      dispatch(types.GET_CARD_LISTS, currentBoarId)
      return false
    }
  },

  /**
   * 取得指定卡片詳細內容
   * @param param0 
   * @param cardId 
   */
  async [types.GET_CARD_INFO]({ commit }, cardId: string): Promise<boolean> {
    let resData = await CardApi.getCardInfo(cardId)

    if (resData.result) {
      let card: Card = {
        _id: cardId,
        ..._.pick(resData, ['title', 'description', 'assignedUser', 'comments'])
      }
      commit(types.SET_CURRENT_CARD, card)
      return true
    } else {
      commit(types.SET_CURRENT_CARD, null)
      return false
    }
  },

  /**
   * 更新卡片所屬類別
   * @param param0 
   * @param param 
   */
  async [types.DRAG_CARD]({ state, commit, dispatch }, param: DragCardParameters): Promise<boolean> {
    commit(types.UPDATE_CARD_LISTS, param)
    let currentBoarId = state.displayedBoard._id
    let resData = await CardListApi.cardChangeStatus({
      source: {
        _id: param.srcListId,
        cards: state.cardLists.find(list => list._id === param.srcListId).cards.map(card => card._id)
      },
      distination: {
        _id: param.dstListId,
        cards: state.cardLists.find(list => list._id === param.dstListId).cards.map(card => card._id)
      }
    })

    if (resData.result) {
      return true
    } else {
      // 新增卡片列表失敗，重新向 Server 取得卡片列表及卡片資料
      // dispatch(types.GET_CARD_LISTS, currentBoarId)
      // fake area
      dispatch(types.GET_FAKE_CARD_LISTS, currentBoarId)
      return false
    }
  },

  /**
   * 新增卡片
   * @param param0 
   * @param payload 
   */
  async [types.CREATE_CARD]({ commit }, param: CreateCardParameters): Promise<boolean> {
    let resData = await CardApi.createCard(param)

    if (resData.result) {
      let card: Card = {
        ..._.pick(resData, ['_id', 'title', 'assignedUser'])
      }
      let mutationsParam: AddNewCarParameters = {
        listId: param.listId,
        card
      }
      commit(types.ADD_NEW_CARD, mutationsParam)
      return true
    } else {
      return false
    }
  },

  /**
   * 更新指定的卡片內容
   * 若更新成功，會更改在卡片列表內的該卡片資訊
   * @param param0 
   * @param param 
   */
  async [types.UPDATE_CARD]({ commit }, param: UpdateCardParameters): Promise<boolean> {
    let reqParam = _.pick(param, ['listId', 'title', 'description', 'assignedUserId'])
    let resData = await CardApi.updateCard(param._id, reqParam)

    if (resData.result) {
      let mutationsParam: updateCardInListParameters = {
        listId: param.listId,
        cardId: param._id,
        title: param.title,
        assignedUserId: param.assignedUserId
      }
      commit(types.UPDATE_CARD_IN_LIST, mutationsParam)
    } else {
      return false
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
    })

    if (resData.result) {
      let mutationsParam: addCommentToCurrentCardParameters = {
        content: param.content
      }
      commit(types.ADD_COMMENT_TO_CURRENT_CARD, mutationsParam)
      return true
    } else {
      return false
    }
  },

  async [types.GET_FAKE_BOARD_LIST]({ commit }): Promise<boolean> {
    console.warn('Get fake board list mode !')
    let boardList: BoardList = [{
      _id: 'ksdfmodsvs',
      boardName: 'Board 1',
      isAdmin: true
    }, {
      _id: 'kldmfklremver',
      boardName: 'Board 2',
      isAdmin: false
    }]
    commit(types.SET_BOARD_LIST, boardList)
    return true
  },

  async [types.GET_FAKE_BOARD_INFO]({ commit }, boardId: string): Promise<boolean> {
    console.warn('Get fake board info mode !')
    let board: Board = {
      _id: boardId,
      boardName: 'Fake board',
      admins: [{ userId: '666', username: 'Jay', email: ''}],
      members: [
        { userId: '666', username: 'Jay', email: '' }, 
        { userId: '777', username: 'Han', email: '' }]
    }
    commit(types.SET_CURRENT_BOARD, board)
    return true
  },

  async [types.CREATE_FAKE_BOARD]({ commit }, boardName: string): Promise<boolean> {
    console.warn('Create fake card !')
    let boardListItem: BoardListItem = {
      _id: (Math.random() * 1000000000).toString(),
      boardName,
      isAdmin: true
    }
    commit(types.INSERT_BOARD_TO_LIST, boardListItem)
    return true
  },

  async [types.GET_FAKE_CARD_LISTS]({ commit }, boardId: string): Promise<boolean> {
    console.warn('Get fake card lists mode !')
    let cardList: CardLists = [{
      _id: 'ascdvsdcs',
      name: 'list1',
      cards: [{
        _id: 'sddwfecw',
        title: 'card1',
        assignedUser: {
          userId: '666',
          username: 'Jay'
        }
      }]
    }, {
      _id: 'sdfdsfeww',
      name: 'list12',
      cards: [{
        _id: 'lskdmfeowkmf',
        title: 'card2',
        assignedUser: {
          userId: 'sdfds',
          username: 'Jay'
        }
      }]
    }]
    commit(types.SET_CARD_LISTS, cardList)
    return true
  },

  async [types.CREATE_FAKE_CARD_LIST]({ state, commit }, cardListName: string): Promise<boolean> {
    console.warn('create fake card list mode !')
    let cardList: CardList = {
      _id: Math.floor(Math.random() * 99999999999).toString(),
      name: cardListName,
      cards: []
    }
    commit(types.ADD_NEW_CARD_LIST, cardList)
    return true
  },

  async [types.CREATE_FAKE_CARD]({ commit }, param: CreateCardParameters): Promise<boolean> {
    console.warn('create fake card mode !')
    let card: Card = {
      _id: Math.floor(Math.random() * 99999).toString(),
      title: param.title,
      assignedUser: {
        userId: param.assignedUserId,
        username: 'whatever'
      }
    }
    let mutationsParam: AddNewCarParameters = {
      listId: param.listId,
      card
    }
    commit(types.ADD_NEW_CARD, mutationsParam)
    return true
  },

  async [types.GET_FAKE_CARD_INFO]({ commit }, cardId: string): Promise<boolean> {
    console.warn('Get fake card mode !')
    let card: Card = {
      _id: 'sddwfecw',
      title: 'card1',
      description: 'hahhahaha',
      assignedUser: {
        userId: '666',
        username: 'Jay'
      },
      comments: [{
        _id: Math.floor(Math.random() * 9999).toString(),
        content: '1111111111'
      }, {
        _id: Math.floor(Math.random() * 9999).toString(),
        content: '22222222222'
      }]
    }
    commit(types.SET_CURRENT_CARD, card)
    return true
  },

  async [types.UPDATE_FAKE_CARD]({ commit }, param: UpdateCardParameters): Promise<boolean> {
    let mutationsParam: updateCardInListParameters = {
      listId: param.listId,
      cardId: param._id,
      title: param.title,
      assignedUserId: param.assignedUserId
    }
    commit(types.UPDATE_CARD_IN_LIST, mutationsParam)
    return true
  },

  async [types.CREATE_FAKE_COMMENT]({ commit }, param: CreateCommentParameters): Promise<boolean> {
    let mutationsParam: addCommentToCurrentCardParameters = {
      content: param.content
    }
    commit(types.ADD_COMMENT_TO_CURRENT_CARD, mutationsParam)
    return true
  },
}