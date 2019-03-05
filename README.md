# isomorphic-storage

> Example of simple isomorphic storage for a nuxt app

## Recipe

This repo shows an example of isomorphic data storage that uses `window.localStorage`
at client and cookies to pass the storage content to Nuxt server. To add the same to
your nuxt project, go through the following steps.

### 1. External modules to install

To work with cookies at server and in browser, install `cookie` and `js-cookie` modules
respectively:

```bash
npm i --save cookie js-cookie
```

### 2. Add LS utility

Add a file [@/assets/utils/ls.js](assets/utils/ls.js). It contains the logic
of storing values both in localStorage and cookies and also some helpers: ready-to-use
vuex mutations and actions:

- `init(context)` should be called inside `nuxtServerInit` with `NuxtContext` object to
  initialize ls module with cookie values, and also inside `nuxtClientInit` for
  initializing the module.

- `get(key, defaultValue = {})` obtains a value with given key from isomorphic storage.

- `set(key, value)` saves value under given key in isomorphic storage.

- `mutations(lsKey)` creates predefined `update` and `restore` mutations that save and load
  vuex module content to/from storage, respectively. Pass it a string that contains a
  property name for the storage.

- `actions` contains predefined actions for server and client module initialization.

### 3. Add LS plugin

The plugin will initialize ls instance on application startup. Simply add a file in plugins
directory ([@/plugins/ls.js](plugins/ls.js)) with the following content:

```js
import * as ls from '@/assets/utils/ls';

export default function (context) {
    ls.init(context);
}
```

### 4. Vuex configuration

Firstly, define the vuex modules that should be saved. In any of them, import LS utility with
`import * as ls from '@/assets/utils/ls';` and add pre-defined actions and mutations:

```js
export const mutations = {
    // ...your mutations
    ...ls.mutations(STORAGE_PROPERTY_NAME) // pass a string unique among modules
};
export const actions = {
    // ...your actions
    ...ls.actions
};
```

Then, create an array of saveable module names inside main vuex module
[@/store/index.js](store/index.js) with `const saveableModules = ['saveable'];`.

After this, add the following code into your nuxtServerInit action:

```js
export const actions = {
    async nuxtServerInit({ dispatch }) {
        for (let i = 0; i < saveableModules.length; i++) {
            // call load action for every saveable module
            await dispatch(saveableModules[i] + '/loadModuleFromStorage');
        }
    }
};
```

### 5. Saving the state

The last step is: inside every module that should be saved, inside any action
that updates module state so that these updates should be saved, add the following
line: `commit('update');`. For example, that's how it is done in [@/store/saveable.js](store/saveable.js):

```js
export const actions = {
    rememberText({ commit }, { text }) {
        commit('setText', text);
        commit('update'); // saves module state
    }
    // ...
};
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm start

# generate static project
npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
