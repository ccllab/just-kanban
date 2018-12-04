import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {ICreatedAtUpdateAt} from "./ICreatedAtUpdateAt";

/**
 * The kanban board card information.
 */
@Entity({
    name: 'boardCard'
})
export class BoardCardEntity extends BaseEntity implements ICreatedAtUpdateAt {

    /**
     * pk
     */
    @ObjectIdColumn()
    public _id: string;

    /**
     * The user id that assigned for this task board card.
     */
    @Column()
    public assignedUserId: string;

    /**
     * Board block title
     */
    @Column()
    public title: string;

    /**
     * The color label
     */
    @Column()
    public label: number;

    /**
     * Task description
     */
    @Column()
    public description: string;

    /**
     * The comment ids
     */
    @Column()
    public comments: Array<string>;

    /**
     * The userId that create this card.
     */
    @Column()
    public createdBy: string;

    /**
     * The userId that update this card.
     */
    @Column()
    public updatedBy: string;

    /**
     * The date time for create board card.
     */
    @Column({
        type: "date"
    })
    public createdAt: Date;

    /**
     * The date time for update board card.
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
