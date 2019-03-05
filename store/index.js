export const state = () => ({
    text: ''
});

export const mutations = {
    setText(state, value) {
        state.text = value;
    }
};

export const actions = {
    rememberText({ commit }, { text }) {
        commit('setText', text);
    }
};
