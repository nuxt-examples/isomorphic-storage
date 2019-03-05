/**
 * Module exposes abstracted local storage that works both on server and client side.
 * On client side, it writes data not only into localStorage, but also in cookies.
 * On server side, it reads data from cookies (and cannot write data)
 */
import clientCookies from 'js-cookie';
import serverCookies from 'cookie';


/**
 * Instance of LS module
 * Has get and set functions as defined below
 * @type {LS}
 */
let instance = null;

/**
 * Initializes LS
 * @param {NuxtContext} context Nuxt context object
 */
export function init(context) {
    const _cookies = {};
    if (process.server) {
        const cookies = serverCookies.parse(context.req.headers.cookie || '');
        Object.assign(_cookies, cookies);
    }

    /**
     * Obtains a value from storage
     * @param {String} key Storage property name
     * @param {any} def Default value to return if no such entry
     * @returns {any} Requested value or default value if not found
     */
    const get = (key, def = {}) => {
        if (process.server) {
            try {
                return JSON.parse(_cookies[key] || 'false') || def;
            } catch (error) {
                console.error(`Cannot parse cookie value "${key}"`, error);
                return def;
            }
        }
        if (!process.client || !window.localStorage) return def;

        const item = window.localStorage.getItem(key) || JSON.stringify(def);
        try {
            return JSON.parse(item);
        } catch (error) {
            console.error(`Cannot parse localStorage value "${key}"`, error);
            return def;
        }
    };

    /**
     * Saves a value in storage
     * @param {String} key Storage property name
     * @param {any} value Value to store, should be JSON-serializable
     * @param {Boolean} options.cookie Save to cookies
     * @param {Number} options.expires Days before cookie spoils down
     */
    const set = (key, value, { cookie = true, expires = 7 } = {}) => {
        if (!process.client || !window.localStorage) return;

        const strValue = JSON.stringify(value);

        window.localStorage.setItem(key, strValue);
        if (cookie) {
            clientCookies.set(key, strValue, { expires });
        }
    };

    instance = {
        get,
        set
    };
}

/**
 * Frees the instance created
 */
export const free = () => {
    instance = null;
};

/**
 * @see instance.get
 */
export const get = (...args) => instance.get(...args);
/**
 * @see instance.set
 */
export const set = (...args) => instance.set(...args);

/**
 * Common vuex mutations for saveable modules
 * @param {String} lsKey Storage property name
 */
export const mutations = lsKey => ({
    /**
     * Restores vuex state saved in storage
     * @param {Object} state Vuex module state
     */
    restore(state) {
        const restoredState = instance.get(lsKey);
        Object.assign(state, restoredState);
    },

    /**
     * Saves vuex module state to storage
     * @param {Object} state Vuex state to save
     */
    update(state) {
        instance.set(lsKey, state);
    }
});

/**
 * Common vuex actions for saveable modules. Requires
 * mutations defined above.
 */
export const actions = {
    loadModuleFromStorage({ commit }) {
        commit('restore');
    }
};
