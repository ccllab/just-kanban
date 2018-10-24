import _Vue ,{PluginFunction, PluginObject} from 'vue';

/**
 * Vue cookie plugin
 */
export default class VueCookie implements PluginObject<{expires: string | number | Date, path: string}> {

    /**
     * Singleton instance
     */
    private static $cookieInstance: VueCookie;

    /**
     * The default config.
     */
    private defaultConfig: {expires: string | number | Date, path: string} = {
        expires: '1d',
        path: '; path=/'
    };

    /**
     * Implement install for PluginObject, make Vue could use this plugin.
     */
    public install: PluginFunction<{expires: string | number | Date, path: string}> = VueCookie.install;

    /**
     * constructor
     * @param options VueCookie options
     */
    private constructor(private options?: {expires: string | number | Date, path: string}) {
        if (options.expires) {
            this.defaultConfig.expires = options.expires;
        }

        if (options.path) {
            this.defaultConfig.path = options.path === '' ? '' : `; path=${options.path}`;
        }
    }

    /**
     * Get VueCookie instance
     * @param options VueCookie options
     * @return instance of VueCookie.
     */
    public static getInstance(options?: {expires: string | number | Date, path: string}): VueCookie {
        return this.$cookieInstance || (this.$cookieInstance = new this(options));
    }

    /**
     * Static method for install this plugin.
     * @param Vue Vue instance
     * @param options VueCookies option
     */
    public static install(Vue: typeof _Vue, options?: {expires: string | number | Date, path: string}): void {
        Vue.prototype.$cookies = VueCookie.getInstance(options);
    }

    /**
     * Override default config
     * @param expires cookie expires
     * @param path cookie path
     */
    public config(expires: string | number | Date, path: string) {

        this.defaultConfig = {
            expires,
            path: path === '' ? '' : `; path=${path}`
        };
    }


    /**
     * Get value by specified key
     * @param key The specified key
     * @return value
     */
    public get(key: string): string | null {
        let value = decodeURIComponent(
            document.cookie
                    .replace(
                        new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"),
                        "$1"
                    )
        ) || null;

        if(value && value.startsWith("{") && value.endsWith("}")) {
            try {
                value = JSON.parse(value);
            }catch (e) {
                return value;
            }
        }

        return value;
    }

    /**
     * Set value of specified key
     * @param key The specified key
     * @param value The value want to set.
     * @param expireTimes Expire time
     * @param path Cookie path
     * @param domain Cookie domain
     * @param secure Cookie secure.
     * @return this
     */
    public set(key: string, value?: any, expireTimes?: any, path?: any, domain?: any, secure?: any) {
        if (!key) {
            throw new Error("cookie name is not find in first argument");
        } else if(/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\t" + "current key name: " + key);
        }

        // support json object
        if (value && value.constructor === Object ) {
            value = JSON.stringify(value);
        }

        let _expires = "; max-age=86400"; // temp value, default expire time for 1 day
        expireTimes = expireTimes || this.defaultConfig.expires;

        if (expireTimes) {
            switch (expireTimes.constructor) {
                case Number:
                    if(expireTimes === Infinity || expireTimes === -1) {
                        _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                    } else {
                        _expires = "; max-age=" + expireTimes;
                    }

                    break;

                case String:
                    if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
                        // get capture number group
                        let _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");

                        // get capture type group , to lower case
                        switch (expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                            // Frequency sorting
                            case 'm':  _expires = "; max-age=" + +_expireTime * 2592000; break; // 60 * 60 * 24 * 30
                            case 'd':  _expires = "; max-age=" + +_expireTime * 86400; break; // 60 * 60 * 24
                            case 'h': _expires = "; max-age=" + +_expireTime * 3600; break; // 60 * 60
                            case 'min':  _expires = "; max-age=" + +_expireTime * 60; break; // 60
                            case 's': _expires = "; max-age=" + _expireTime; break;
                            case 'y': _expires = "; max-age=" + +_expireTime * 31104000; break; // 60 * 60 * 24 * 30 * 12
                            default: new Error("unknown exception of 'set operation'");
                        }
                    } else {
                        _expires = "; expires=" + expireTimes;
                    }

                    break;

                case Date:
                    _expires = "; expires=" + expireTimes.toUTCString();

                    break;
            }
        }

        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + _expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : this.defaultConfig.path) + (secure ? "; secure" : "");

        return this;
    }

    /**
     * Remove cookie by specified key.
     * @param key The specified key.
     * @param path The specified path.
     * @param domain The specified domain.
     * @return success return VueCookie instance, failed return false.
     */
    public remove(key, path?: any, domain?: any): VueCookie | boolean {
        if (!key || !this.isKey(key)) {
            return false;
        }

        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : this.defaultConfig.path);

        return this;
    }

    /**
     * Check is key.
     * @param key The specified key.
     * @return true/false.
     */
    public isKey(key: string): boolean {

        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    /**
     * Return all keys
     * @return Array of key
     */
    public keys(): string[] {
        if(!document.cookie) {
            return [];
        }

        let _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (let _index = 0; _index < _keys.length; _index++) {
            _keys[_index] = decodeURIComponent(_keys[_index]);
        }

        return _keys;
    }
}

// add $cookies property to vue instance define.
declare module 'vue/types/vue' {
    interface Vue {
        $cookies: VueCookie;
    }
}
