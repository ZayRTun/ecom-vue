import axios from 'axios'


export const state = {
    user: window.config.data.user,
}

// getters
export const getters = {
    user: state => state.user,
    check: state => state.user !== null
}

// mutations
export const mutations = {

    fetchUserSuccess(state, { user }) {
        state.user = user
    },

    logout(state) {
        state.user = null
    },

    updateUser(state, { user }) {
        state.user = user
    },
}

// actions
export const actions = {
    async fetchUser({ commit }) {
        try {
            const { data } = await axios.get('/api/user')

            commit('fetchUserSuccess', { user: data })
        } catch (e) {
            console.log(e)
        }
    },

    updateUser({ commit }, payload) {
        commit('updateUser', payload)
    },

    async logout({ commit }) {
        try {
            await axios.post('/logout')
        } catch (e) { }

        commit('logout')
    }
}
