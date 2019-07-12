import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/login.vue'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // { name: 'home', path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      // 加了一个二级路由组件
      children: [
        { name: 'welcome', path: '/', component: Welcome }
      ]
    }
  ]
})

export default router
