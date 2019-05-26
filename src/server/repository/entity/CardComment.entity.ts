import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {ICreatedAtUpdateAt} from "./ICreatedAtUpdateAt";
import {Exclude} from "class-transformer";

/**
 * The kanban board card comment.
 */
@Entity({
    name: 'cardComment'
})
export class CardCommentEntity extends BaseEntity implements ICreatedAtUpdateAt {

    /**
     * pk
     */
    @ObjectIdColumn()
    public _id: ObjectID;

    /**
     * Comment content
     */
    @Column()
    public content: string;

    /**
     * The userId that create this comment.
     */
    @Column()
    public createdBy: string;

    /**
     * The userId that update this comment.
     */
    @Column()
    public updatedBy: string;

    /**
     * The date time for create board card comment.
     */
    @Column({
        type: "date"
    })
    public createdAt: Date;

    /**
     * The date time for update board card comment.
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
