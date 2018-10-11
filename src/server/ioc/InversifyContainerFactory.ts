import {Container} from 'inversify';
import registerRepository from '../repository/typeRegistrar';
import registerUtil from '../utils/typeRegistrar';
import registerServices from "../services/typeRegistrar";

/**
 * Inversify DI 容器工廠
 * @singleton
 */
export class InversifyContainerFactory {

    /**
     * 容器工廠的實例
     */
    private static containerFactoryInstance: InversifyContainerFactory;

    /**
     * DI 容器
     */
    public container: Container;

    /**
     * 私有建構子，建立 DI 容器
     */
    private constructor() {

        this.container = new Container();

        // 註冊儲存庫層
        registerRepository(this.container);

        // 註冊服務
        registerServices(this.container);

        // 註冊 util
        registerUtil(this.container);
    }

    /**
     * 取得容器工廠的實例
     * @returns 容器工廠
     */
    public static getInstance(): InversifyContainerFactory {

        return this.containerFactoryInstance || (this.containerFactoryInstance = new this());
    }
}