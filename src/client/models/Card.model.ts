import { User } from './User.model'

export class Card {
  /**
   * Card ObjectID
   */
  public _id: string

  /**
   * Card's title
   */
  public title: string

  /**
   * Card's description
   */
  public description: string

  /**
   * User who assigned to this card
   */
  public assignedUser: User

  /**
   * Card's comments
   */
  public comments: [{ id: string, content: string }]
}