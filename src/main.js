import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 在vue-cli创建的项目中  @的前缀 代表的是根路径 src目录
// 默认会去加载索引文件  index.js index.vue index.json  必须是index  因为只解析index
import router from '@/router'
import axios from 'axios'
// defaults是配置   基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头
axios.defaults.headers = {
  // token认证需要的字段 值： 注意要加上个前缀 Bearer 注意；bearer后面有一个空格
  Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtt')).token
}
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

// 实例化根实例  render() 渲染APP组件   然后挂载到#app的容器内
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
