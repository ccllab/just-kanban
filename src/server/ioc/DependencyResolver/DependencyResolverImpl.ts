import {Container} from 'inversify';
import {IDependencyResolver} from './IDependencyResolver';

/**
 * 相依性解析
 * @singleton
 */
export class DependencyResolverImpl implements IDependencyResolver {

    /**
     * 解析器之單例
     */
    private static resolverInstance: DependencyResolverImpl;

    /**
     * DI 容器
     */
    private containerInstance: Container;

    /**
     * 私有建構子
     */
    private constructor() {
    }

    /**
     * 取得解析器單例
     * @returns DI 解析器
     */
    public static current(): IDependencyResolver {

        return this.resolverInstance || (this.resolverInstance = new this());
    }

    /**
     * 設定 DI 容器
     * @param container DI 容器
     */
    public SetContainer(container: Container): void {

        this.containerInstance = container;
    }

    /**
     * 由指定鍵值解析指定類型
     * @param resolveKey 指定之解析鍵值
     * @returns 指定之類型
     */
    public Resolve<TService>(resolveKey: string | symbol): TService {

        return this.containerInstance.get<TService>(resolveKey);
    }

    /**
     * 由註冊時指定的名稱與鍵值解析
     * @param resolveKey 指定之解析鍵值
     * @param name 註冊時額外設定的類型名稱
     * @returns 指定之類型
     */
    public ResolveNamed<TService>(resolveKey: string | symbol, name: string): TService {

        return this.containerInstance.getNamed<TService>(resolveKey, name);
    }
}