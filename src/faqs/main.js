import Vue from 'vue'
import App from '@/faqs/App.vue'
import VueRouter from 'vue-router'
import Vuesax from 'vuesax'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'vuesax/dist/vuesax.css'; // Vuesax

Vue.use(VueRouter);
Vue.use(Antd);

import "@/assets/scss/main.scss"
import '@/assets/css/main.css'

Vue.use(VueRouter);

Vue.config.productionTip = false

import IconCrypto from "vue-cryptocurrency-icons";

require('@/assets/css/iconfont.css')

Vue.use(IconCrypto)
Vue.use(Vuesax)

const routes = new VueRouter({
    mode: 'history',
    base: '/faqs',
    routes: [
        {
            path: '/general-provitions',
            name: 'General Provitions',
            component: () => import('@/faqs/general-provitions.vue'),
        },
        {
            path: '/rights-and-obligations',
            name: 'Rights And Obligations',
            component: () => import('@/faqs/rights-and-obligations.vue'),
        }
    ]
});

if (process.env.NODE_ENV !== 'development') {
    // eslint-disable-next-line no-console
    console.log(
        ` %c trading-faqs  %c LastBuildTime: ${__APP_INFO__['build_time']},commit:${__APP_INFO__['commit']} `,
        'color: #fadfa3; background: #030307; padding:5px 0;',
        'background: #fadfa3; padding:5px 0;'
    )
}

new Vue({
    router: routes,
    render: h => h(App)
}).$mount('#app')
