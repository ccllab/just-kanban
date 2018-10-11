import AuthModule from "./modules/auth/AuthModule";
import ImagesModule from "./modules/images/ImagesModule";

/**
 * 根狀態模型
 */
export interface IRootState {

    /**
     * App version
     */
    version: string;

    /**
     * 驗證模組
     */
    authModule?: AuthModule;

    /**
     * 圖片模組
     */
    imagesModule?: ImagesModule;
}