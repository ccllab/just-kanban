import { User } from './User.model'

export class Card {
  /**
 * Card ObjectID
 */
  _id: string

  /**
   * Card's title
   */
  title: string

  /**
   * User who assigned to this card
   */
  assignedUser: User
  
  /**
   * Card's description
   */
  description?: string

  /**
   * Card's comments
   */
  comments?: { _id: string, content: string }[]
}

