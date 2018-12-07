export type userId = string

/**
 * User's information
 */
export class User {
  /**
   * User's ID
   */
  userId: userId

  /**
   * User's name
   */
  username: string

  /**
   * User's Email
   */
  email?: string
}