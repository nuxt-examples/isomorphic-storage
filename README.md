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

### 2. Vuex configuration

*// TODO*

### 3. Add LS module

Add a file [@/assets/utils/ls](blob/master/assets/utils/ls.js). It contains the logic
of storing values both in localStorage and cookies and also some helpers: ready-to-use
vuex mutations and actions.

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
