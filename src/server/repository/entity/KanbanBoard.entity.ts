import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";
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
     * The ids for child board cards.
     */
    @Column()
    public boardCardIds: Array<string>;

    /**
     * The date time for create board card.
     */
    @Column({
        type: "date"
    })
    public createdAt: Date;

    /**
     * The date time for update boa
    rd card.
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
