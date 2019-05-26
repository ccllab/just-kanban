import { User } from '../models/User.model'

/**
 * Kanban board information.
 */
export class Board {
    /**
     * Board's Object ID
     */
    public _id: string

    /**
     * Board's name
     */
    public boardName: string

    /**
     * Board's admin users
     */
    public admins: User[]

    /**
     * Board's members
     */
    public members: User[]
}
