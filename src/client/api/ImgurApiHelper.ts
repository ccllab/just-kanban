import {stringify} from 'qs';
import axios, {AxiosPromise, AxiosResponse} from 'axios';

/**
 * Imgur api
 */
export default class ImgurApiHelper {

    /**
     * 站台 client id
     */
    private static CLIENT_ID = process.env.VUE_APP_CLIENT_ID;

    /**
     * imgur api root url
     */
    private static ROOT_URL = 'https://api.imgur.com';

    /**
     * oauth2 登入
     */
    public static login(): void {
        const queryString = {
            client_id: this.CLIENT_ID,
            response_type: 'token'
        };

        window.location.href = `${this.ROOT_URL}/oauth2/authorize?${stringify(queryString)}`;
    }

    /**
     * 載入登入使用者的圖片
     * @param token Access token
     * @return AxiosPromise
     */
    public static fetchImages(token: string): AxiosPromise {
        return axios.get(
            `${this.ROOT_URL}/3/account/me/images`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    }

    /**
     * 上傳圖片
     * @param images 欲上傳的圖片檔案集合
     * @param token Access token
     * @return Promise
     */
    public static uploadImages(images: FileList, token: string): Promise<AxiosResponse<any>[]> {
        const promises = Array.from(images).map(image => {
            const formData = new FormData();

            formData.append('image', image);

            return axios.post(
                `${this.ROOT_URL}/3/image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        });

        return Promise.all(promises);
    }
}