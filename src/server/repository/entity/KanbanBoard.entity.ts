import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ICreatedAtUpdateAt} from "./ICreatedAtUpdateAt";
import {Exclude} from "class-transformer";

/**
 * KanbanBoard entity
 */
@Entity({
    name: 'kanbanBoard'
})
export class KanbanBoardEntity extends BaseEntity implements ICreatedAtUpdateAt {

    /**
     * pk
     */
    @ObjectIdColumn()
    public _id: string;

    /**
     * The name of kanban board
     */
    @Column()
    public boardName: string;

    /**
     * The admin users' ObjectIds for this board.
     */
    @Column()
    public admins: Array<string> = [];

    /**
     * The member user ObjectIds for this board.
     */
    @Column()
    public memberIds: Array<string> = [];

    /**
     * The ids for child board cards list.
     */
    @Column()
    public cardListIds: Array<string> = [];

    /**
     * The date time for create KanbanBoard entity.
     */
    @Column({
        type: "date"
    })
    public createdAt: Date;

    /**
     * The date time for update KanbanBoard entity.
     */
    @Column({
        type: "date"
    })
    public updatedAt: Date;

    /**
     * The flag for check this entity has implemented ICreatedAtUpdateAt
     * @return createdAt
     */
    @Exclude()
    public createdAtFlag(): Date {
        return this.createdAt;
    }

    /**
     * The flag for check this entity has implemented ICreatedAtUpdateAt
     * @return updatedAt
     */
    @Exclude()
    public updatedAtFlag(): Date {
        return this.updatedAt;
    }
}
