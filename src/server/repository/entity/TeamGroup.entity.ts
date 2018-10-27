import {BaseEntity, Column, ObjectIdColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {ICreatedAtUpdateAt} from "./ICreatedAtUpdateAt";

/**
 * TeamGroup entity
 */
export class TeamGroupEntity extends BaseEntity implements ICreatedAtUpdateAt {

    /**
     * pk
     */
    @ObjectIdColumn()
    public _id: string;

    /**
     * The name of team
     */
    @Column()
    public teamName: string;

    /**
     * The board id of this team
     */
    @Column()
    public kanbanBoardId: string;

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
