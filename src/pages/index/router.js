import Vue from 'vue'
import Router from 'vue-router'
import {$t} from '@/i18n/client/i18n'

//import auth from "@/auth/authService";

//import firebase from 'firebase/compat/app'
//import 'firebase/auth'

import AuthenticationService from '@/services/AuthenticationService'
//import getData from '@/pages/trade/navbar/components/data.json'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            component: () => import('@/pages/trade/TradeMain.vue'),
            children: [
                {
                    path: '/',
                    name: 'index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Gatediamon'
                    }
                },
                {
                    path: '/challenge',
                    name: 'challenge',
                    component: () => import('../../views/trading/Index.vue'),
                    meta: {
                        title: 'Trang chủ'
                    }
                },
                {
                    path: '/token-airdrop',
                    name: 'token-airdrop',
                    component: () => import('../../views/trading/Index.vue'),
                    meta: {
                        title: 'Trang chủ'
                    }
                },
                {
                    path: '/ho-tro',
                    name: 'Support',
                    component: () => import('@/pages/index/Faq.vue'),
                    meta: {
                        title: 'Hỗ trợ'
                    }
                },
                {
                    path: '/thong-bao',
                    name: 'Notification',
                    component: () => import('@/pages/index/Notification.vue'),
                    meta: {
                        title: 'Hỗ trợ'
                    }
                },
                {
                    path: '/login',
                    name: 'login-index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Đăng nhập'
                    }
                },
                {
                    path: '/register',
                    name: 'register-index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Đăng ký'
                    }
                },
                {
                    path: '/register/:r',
                    name: 'register-param-index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Đăng ký'
                    }
                },
                {
                    path: '/forgot-password',
                    name: 'forgot-password-index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Quên mật khẩu'
                    }
                },
                {
                    path: '/register-resend-verify-email',
                    name: 'register-resend-verify-email-index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Gửi lại email xác nhận'
                    }
                },
                {
                    path: '/reset-password',
                    name: 'reset-password-index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Đặt lại mật khẩu'
                    }
                },
                {
                    path: '/reset-password/:e',
                    name: 'reset-password-param-index',
                    component: () => import('@/pages/index/Home.vue'),
                    meta: {
                        title: 'Đặt lại mật khẩu'
                    }
                },
                {
                    path: '/trading',
                    name: 'client-index',
                    component: () => import('../../views/trading/Index.vue'),
                    meta: {
                        title: $t(`Trade`),
                        requiresAuth: true
                    }
                },
                {
                    path: '/user/balance',
                    name: 'balance-user',
                    component: () => import('../../views/trading/Wallet.vue'),
                    meta: {
                        title: $t(`Wallet`),
                        requiresAuth: true
                    }
                },
                {
                    path: '/user/exchange',
                    name: 'exchange-user',
                    component: () => import('../../views/trading/Exchange.vue'),
                    meta: {
                        title: 'Exchange',
                        requiresAuth: true
                    }

                },
                {
                    path: '/user/trade/history',
                    name: 'trade-user-history',
                    component: () => import('../../views/trading/TradeHistory.vue'),
                    meta: {
                        title: 'Trade history',
                        requiresAuth: true
                    }
                },
                {
                    path: '/user/affiliate/general',
                    name: 'affiliate-user-general',
                    component: () => import('../../views/trading/Affiliate.vue'),
                    meta: {
                        title: 'Affiliate General',
                        requiresAuth: true
                    }
                },
                {
                    path: '/user/affiliate/championship',
                    name: 'championship',
                    component: () => import('../../views/trading/Championship.vue'),
                    meta: {
                        title: $t(`Championship`),
                        requiresAuth: true
                    }
                },
                {
                    path: '/user/affiliate/lucky',
                    name: 'lucky',
                    component: () => import('../../views/trading/Lucky.vue'),
                    meta: {
                        title: $t(`DrawLuckyLots`),
                        requiresAuth: true
                    }
                },

                // {
                //     path: '/streak-challenge',
                //     name: 'Streak Challenge',
                //     component: () => import('../../views/trading/StreakChallenge.vue'),
                //     meta: {
                //         title: 'Streak Challenge',
                //         requiresAuth: true
                //     }
                // }


            ],
            meta: {
                hideForAuth: true
            }
        },
        {
            path: '/',
            name: 'maintenance-page',
            component: () => import('@/pages/index/BaoTri.vue')
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
    linkActiveClass: 'router-link-active ',
    linkExactActiveClass: ''
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;

    AuthenticationService.getStatusServer()
        .then((res) => {
            if (res.data.ok) {
                return next({name: 'maintenance-page'})
            }
        })

    if (["lucky", "championship"].includes(to.name)) {
        AuthenticationService.getActiveGames().then((res) => {
            const activeGames = res.data;
            if (to.name == "lucky" && !activeGames.lucky) {
                return next({name: "client-index"})
            }

            if (to.name == "championship" && !activeGames.champion) {
                return next({name: "client-index"})
            }
        });
    }

    if (["login-index",
        "register-index",
        "register-param-index",
        "forgot-password-index",
        "forgot-password-index",
        "register-resend-verify-email-index",
        "reset-password-index",
        "reset-password-param-index"
    ].includes(to.name) && localStorage.hasOwnProperty("tokenUser")) {
        return next({name: "client-index"})
    }
    // firebase.auth().onAuthStateChanged(() => {

    //     if (to.matched.some(record => record.meta.requiresAuth)) {
    //         // const token = localStorage.getItem('tokenUser');

    //         // if (!token){
    //         //     //next({ name: 'login-index' })
    //         //     window.location.href = window.location.origin + '/login'
    //         // } else {
    //         //     next()
    //         // }


    //     } else {
    //         next() // does not require auth, make sure to always call next()!
    //     }

    //     // if (to.matched.some(record => record.meta.hideForAuth)) {
    //     //     const token = localStorage.getItem('tokenUser');

    //     //     if (token){
    //     //         next({ name: 'client-index' })
    //     //     } else {
    //     //         next()
    //     //     }
    //     // } else {
    //     //     next() // does not require auth, make sure to always call next()!
    //     // }

    // })

    return next()
})

export default router
