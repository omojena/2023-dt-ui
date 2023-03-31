import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import store from './store';
import router from './router/index';

import 'vue2-timepicker/dist/VueTimepicker.css'
import './axiosInterceptor';
import '../src/assets/segoeui/stylesheet.scss'
import '../src/assets/mdi-font/scss/materialdesignicons.scss'
import '../src/assets/font-icon/doublet.scss'

import '../theme/calendar.scss'

import vueEventCalendar from 'vue-event-calendar'

let filter = function (text, length, clamp) {
    clamp = clamp || '...';
    let node = document.createElement('div');
    node.innerHTML = text;
    let content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);


Vue.use(vueEventCalendar, {locale: 'es'});

Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');