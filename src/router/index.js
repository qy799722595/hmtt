import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/login.vue'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Cwxx from '@/views/404'
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
    },
    { name: '404', path: '*', component: Cwxx }
  ]
})

// 注册一个全局的前置导航守卫
router.beforeEach((to, from, next) => {
  // 如果不去主动触发 resolve (next 下一步) 会一直等待
  // console.log('ok')
  // 如果是登录页 放行  如果去其他页面 拦截
  // if(to.path === '/login') return next()
  // const user = window.sessionStorage.getItem('hmtt')
  // if (user) {
  //   next()
  // }else {
  //   next('/login')
  // }
  const user = window.sessionStorage.getItem('hmtt')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
