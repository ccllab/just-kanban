import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class BoardCardEntity extends BaseEntity {

    /**
     * pk 編號
     */
    @ObjectIdColumn()
    public id: ObjectID;

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
