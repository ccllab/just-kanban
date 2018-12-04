import { BaseResponseData } from './base'

export interface CreateCardRequest {
  listId: string,
  title: string,
  description: string,
  assignedUserId: string
}

export interface CreateCardResponsrData {
  _id: string,
  title: string,
  description: string,
}

export interface GetCardInfoResponseData extends BaseResponseData {
  title: string,
  description: string,
  assignedUser: {
    _id: string,
    name: string
  },
  comments: [{
    _id: string,
    content: string
  }]
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

export interface ICardApiHelper {
  createCard(param: CreateCardRequest): Promise<CreateCardResponsrData>;
  getCardInfo(id: string): Promise<GetCardInfoResponseData>;
  updateCard(id: string, param: UpdateCardRequest): Promise<BaseResponseData>;
  createCardComment(id: string, param: CreateCardCommentRequest): Promise<BaseResponseData>
}