import {Container} from 'inversify';

/**
 * 相依性解析介面
 */
export interface IDependencyResolver {

    /**
     * 設定 DI 容器
     * @param container DI 容器
     */
    SetContainer(container: Container): void;

    /**
     * 由指定鍵值解析指定類型
     * @param resolveKey 指定之解析鍵值
     * @returns 指定之類型
     */
    Resolve<TService>(resolveKey: string | symbol): TService;

    /**
     * 由註冊時指定的名稱與鍵值解析
     * @param resolveKey 指定之解析鍵值
     * @param name 註冊時額外設定的類型名稱
     * @returns 指定之類型
     */
    ResolveNamed<TService>(resolveKey: string | symbol, name: string): TService;
}