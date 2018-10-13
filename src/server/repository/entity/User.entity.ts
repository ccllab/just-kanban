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
 * User 實體資料
 */
@Entity()
export class User extends BaseEntity {

    /**
     * pk 編號
     */
    @ObjectIdColumn()
    public id: string;

    /**
     * 名稱
     */
    @Column({
        length: 20
    })
    public username: string;

    /**
     * 電子信箱
     */
    @Column({
        length: 40,
        nullable: false,
        unique: true
    })
    public email: string;

    /**
     * 使用者密碼
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
     * 驗證用 token
     */
    @Column()
    public authToken: string;

    /**
     * 建立時間
     */
    @CreateDateColumn()
    public createdAt: Date;

    /**
     * 更新時間
     */
    @UpdateDateColumn()
    public updatedAt: Date;
}
