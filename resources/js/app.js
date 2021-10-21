import Vue from 'vue'
import store from './store/index';
import router from './router/index';
import InstantSearch from 'vue-instantsearch'
import App from './components/App'
import ProgressBar from './components/ProgressBar'
require('./bootstrap');

import Default from './layout/Default'
import Basic from './layout/Basic'

Vue.use(InstantSearch)

Vue.component('default-layout', Default)
Vue.component('basic-layout', Basic)
Vue.component(ProgressBar.name, ProgressBar)

// Vue.component('app-layout', require('./layout/App.vue').default);

const app = new Vue({
    store: store,
    el: '#app',
    render: h => h(App),
    router: router
});
