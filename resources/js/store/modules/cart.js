let cart = window.localStorage.getItem('cart')
// state
export const state = {
    minDelivery: window.config.data.min_delivery_amount,
    products: cart ? JSON.parse(cart) : [],
}

// getters
export const getters = {
    cart: state => state.products,
    deliveryThreshold: state => state.minDelivery
}

// mutations
export const mutations = {
    addToCart(state, { id, name, price, image }) {
        const record = state.products.find(p => p.id === id)

        if (!record) {
            state.products.push({
                id: id,
                name: name,
                price: price,
                quantity: 1,
                image: image
            })
        } else {
            record.quantity++
        }

        window.localStorage.setItem('cart', JSON.stringify(state.products))
    },

    incrementQty(state, { id }) {
        const record = state.products.find(p => p.id === id).quantity++

        window.localStorage.setItem('cart', JSON.stringify(state.products))
    },

    decrementQty(state, { id }) {
        const record = state.products.find(p => p.id === id)

        if (record.quantity > 1) {
            record.quantity--
        } else {
            let pos = state.products.map(p => p.id).indexOf(id)
            state.products.splice(pos, 1)
        }

        window.localStorage.setItem('cart', JSON.stringify(state.products))
    },
}

// actions
export const actions = {
    addToCart({ commit }, payload) {
        commit('addToCart', payload)
    },

    incrementQty({ commit }, payload) {
        commit('incrementQty', payload)
    },

    decrementQty({ commit }, payload) {
        commit('decrementQty', payload)
    }
}