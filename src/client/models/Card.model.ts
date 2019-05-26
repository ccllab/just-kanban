import { User } from './User.model';

export class Card {
  /**
 * Card ObjectID
 */
  public _id: string;

  /**
   * Card's title
   */
  public title: string;

  /**
   * User who assigned to this card
   */
  public assignedUser: User;
  
  /**
   * Card's description
   */
  public description?: string;

  /**
   * Card's comments
   */
  public comments?: { _id: string, content: string }[]
}

