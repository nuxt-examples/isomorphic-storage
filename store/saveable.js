import * as ls from '@/assets/utils/ls';

export const state = () => ({
    text: ''
});

export const mutations = {
    setText(state, value) {
        state.text = value;
    },

    ...ls.mutations('my-text')
};

export const actions = {
    rememberText({ commit }, { text }) {
        commit('setText', text);
        commit('update'); // saves module state
    },

    ...ls.actions
};
