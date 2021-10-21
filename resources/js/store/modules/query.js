export const state = {
    query: ''
}

export const getters = {
    query: state => state.query
}

export const mutations = {
    makeQuery(state, query) {
        state.query = query
    }
}

export const actions = {
    sendQuery({ commit }, payload) {
        commit('makeQuery', payload)
    }
}