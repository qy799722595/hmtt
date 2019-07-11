import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/login.vue'
// import Home from '@views/home'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // { name: 'home', path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login }
    // { path: '/',
    //   component: Home,
    //   children:[

    //   ]
    // }
  ]
})

export default router
