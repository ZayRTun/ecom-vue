import Home from '../views/Home'
import Products from '../views/Products'
import Login from '../views/Login'
import About from '../views/About'
import Dashboard from '../views/Dashboard'
import NotFound from '../views/NotFound'

import auth from '../middleware/auth'

export default [
    {
        path: '/',
        component: Home,
        name: 'Home',
        meta: {
            layout: 'basic'
        }
    },

    {
        path: '/products',
        component: Products,
        name: 'Products',
        meta: {
            layout: 'default'
        }
    },

    {
        path: '/login',
        component: Login,
        name: 'Login',
        meta: {
            layout: 'basic'
        }
    },

    {
        path: '/about',
        component: About,
        name: 'About',
        meta: {
            layout: 'basic',
            // middleware: [
            //     auth
            // ]
        }
    },

    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
            layout: 'basic',
            // middleware: [
            //     auth
            // ]
        }
    },

    {
        path: '/404',
        component: NotFound,
        name: 'NotFound',
        meta: {
            layout: 'basic'
        }
    }
]