import store from '../store/index'
import Cookies from 'js-cookie'

export default async ({ to, next }) => {
    if (!store.getters['auth/check']) {
        Cookies.set('intended_url', to.path)

        next({ name: 'Login' })
    } else {
        next()
    }
}