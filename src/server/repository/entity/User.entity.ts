import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn,} from 'typeorm';
import {Exclude} from "class-transformer";
import {ExtendedColumnOptions} from 'typeorm-encrypted';
import {ICreatedAtUpdateAt} from "./ICreatedAtUpdateAt";

/**
 * User data
 */
@Entity()
export class User extends BaseEntity implements ICreatedAtUpdateAt {

    /**
     * pk
     */
    @ObjectIdColumn()
    public _id: ObjectID;

    /**
     * User Id
     */
    @Column({
        length:25,
        nullable:false,
        unique: true
    })
    public userId: string;

    /**
     * username
     */
    @Column({
        length: 20
    })
    public username: string;

    /**
     * user's email
     */
    @Column({
        length: 40,
        nullable: false,
        unique: true
    })
    public email: string;

    /**
     * user's password
     */
    @Column(<ExtendedColumnOptions>{
        nullable: false,
        encrypt: {
            key: '3445768f48481eeb9c8304ce0b48481eeb9c8304ce0a5e3cb5e3cb58479fff32',
            algorithm: 'aes-256-cbc',
            ivLength: 16
        },
        length: 90
    })
    public password: string;

    /**
     * The board ids of this user
     */
    @Column()
    public boardIds: Array<ObjectID | any> = []; // because god damn typeorm ObjectID declare different from mongodb

    /**
     * The token for refresh authentication.
     */
    @Column()
    public refreshToken: string;

    /**
     * The date time for create user information.
     */
    @Column({
        type: "date"
    })
    public createdAt: Date;

    /**
     * The date time for update user information.
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
