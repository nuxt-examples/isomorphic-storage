const saveableModules = ['saveable'];

export const state = () => ({
});

export const mutations = {
};

export const actions = {
    async nuxtServerInit({ dispatch }) {
        for (let i = 0; i < saveableModules.length; i++) {
            // call load action for every saveable module
            await dispatch(saveableModules[i] + '/loadModuleFromStorage');
        }
    }
};
