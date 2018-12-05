import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";
import {ICreatedAtUpdateAt} from "./ICreatedAtUpdateAt";
import {Exclude} from "class-transformer";

/**
 * The board card list, storage and sort card.
 */
@Entity({
    name: 'cardList'
})
export class CardListEntity extends BaseEntity implements ICreatedAtUpdateAt {

    /**
     * pk
     */
    @ObjectIdColumn()
    public _id: string;

    /**
     * The list name
     */
    @Column()
    public name: string;

    /**
     * The card ids in this list.
     */
    @Column()
    public cardIds: Array<string> = [];

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
