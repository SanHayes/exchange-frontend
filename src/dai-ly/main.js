import Vue from 'vue'
import App from '@/dai-ly/App.vue'
import VueRouter from 'vue-router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'vuesax/dist/vuesax.css'; // Vuesax

Vue.use(VueRouter);
Vue.use(Antd);

import "@/assets/scss/main.scss"
import '@/assets/css/main.css'

import IconCrypto from "vue-cryptocurrency-icons";

require('@/assets/css/iconfont.css')

Vue.use(IconCrypto)

Vue.config.productionTip = false

const routes = new VueRouter({
    mode: 'history',
    base: '/daily',
    routes: [
        {
            path: '/',
            component: () => import('@/dai-ly/TradeMain.vue'),
            children: [
                {
                    path: '/',
                    name: 'index',
                    component: () => import('@/dai-ly/Main.vue'),
                    meta: {
                        title: 'Gatediamon đại lý'
                    }
                },
            ]
        }
    ]
});

if (process.env.NODE_ENV !== 'development') {
    // eslint-disable-next-line no-console
    console.log(
        ` %c trading-daily  %c LastBuildTime: ${__APP_INFO__['build_time']},commit:${__APP_INFO__['commit']} `,
        'color: #fadfa3; background: #030307; padding:5px 0;',
        'background: #fadfa3; padding:5px 0;'
    )
}

new Vue({
    router: routes,
    render: h => h(App)
}).$mount('#app')
