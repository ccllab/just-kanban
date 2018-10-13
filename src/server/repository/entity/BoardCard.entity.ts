import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";

@Entity()
export class BoardCardEntity extends BaseEntity {

    /**
     * pk 編號
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
}
