import {BaseEntity, Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn} from "typeorm";

/**
 * The kanban board card information.
 */
@Entity()
export class BoardCardEntity extends BaseEntity {

    /**
     * pk
     */
    @ObjectIdColumn()
    public id: string;

    /**
     * Board block title
     */
    @Column()
    public title: string;

    /**
     * Board block status
     */
    @Column()
    public status: string;

    /**
     * The date time for create board card.
     */
    @CreateDateColumn()
    public createdAt: Date;

    /**
     * The date time for update board card.
     */
    @UpdateDateColumn()
    public updatedAt: Date;
}
