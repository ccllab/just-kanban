import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn
} from 'typeorm';
import {ExtendedColumnOptions} from 'typeorm-encrypted';

/**
 * User data
 */
@Entity()
export class User extends BaseEntity {

    /**
     * pk
     */
    @ObjectIdColumn()
    public id: string;

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
            key: 'd85117047fd06d3afa79b6e44ee3a52eb426fc24c3a2e3667732e8da0342b4da',
            algorithm: 'aes-256-cbc',
            ivLength: 16
        },
        length: 90
    })
    public password: string;

    /**
     * The token for access web site function
     */
    @Column()
    public authToken: string;

    /**
     * The token for refresh authentication.
     */
    @Column()
    public refreshToken: string;

    /**
     * The date time for create user information.
     */
    @CreateDateColumn()
    public createdAt: Date;

    /**
     * The date time for update user information.
     */
    @UpdateDateColumn()
    public updatedAt: Date;
}
