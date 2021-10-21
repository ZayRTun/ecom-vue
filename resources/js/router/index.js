import Vue from 'vue'
import store from '../store/index'
import routes from './routes'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

Vue.use(Router)

// the middleware for every page of the application.
const globalMiddleware = ['locale']

const router = createRouter()

sync(store, router)

export default router

/**
 * Create a new router instance.
 *
 * @return {Router}
 */
function createRouter() {
    const router = new Router({
        mode: 'history',
        routes
    })

    router.beforeEach(beforeEach)
    // router.afterEach(afterEach)

    return router
}


async function beforeEach(to, from, next) {
    if (!to.meta.middleware) {
        return next()
    }

    const middleware = to.meta.middleware

    const context = { to, from, next }

    return middleware[0]({ ...context, next: middlewarePipeline(context, middleware, 1) })

}

function middlewarePipeline(context, middleware, index) {
    const nextMiddleware = middleware[index]

    if (!nextMiddleware) {
        return context.next
    }

    return () => {
        const nextPipeline = middlewarePipeline(context, middleware, index + 1)

        nextMiddleware({ ...context, next: nextPipeline })
    }
}


/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach(to, from, next) {
    await router.app.$nextTick()

    router.app.$loading.finish()
}