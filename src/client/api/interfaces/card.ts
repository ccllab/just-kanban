import { BaseResponseData } from './base'

export interface CreateCardRequest {
  listId: string,
  title: string,
  description: string,
  assignedUserId: string
}
export interface UpdateCardRequest {
  listId: string,
  title: string,
  description: string,
  assignedUserId: string
}
export interface CreateCardCommentRequest {
  content: string
}

export interface CreateCardResponsrData extends BaseResponseData {
  _id: string,
  title: string,
  assignedUser: {
    userId: string,
    username: string
  }
}
export interface GetCardInfoResponseData extends BaseResponseData {
  _id: string,
  title: string,
  description: string,
  assignedUser: {
    userId: string,
    username: string
  },
  comments: [{
    _id: string,
    content: string
  }]
}
export interface UpdateCardResponseData extends BaseResponseData {
  _id: string,
  title: string,
  description: string,
  assignedUser: {
    userId: string,
    username: string
  }
}
export interface CreateCardCommentResponseData extends BaseResponseData {
  _id: string
  content: string
}

export interface ICardApiHelper {
  createCard(param: CreateCardRequest): Promise<CreateCardResponsrData>;
  getCardInfo(id: string): Promise<GetCardInfoResponseData>;
  updateCard(id: string, param: UpdateCardRequest): Promise<UpdateCardResponseData>;
  createCardComment(id: string, param: CreateCardCommentRequest): Promise<CreateCardCommentResponseData>
}