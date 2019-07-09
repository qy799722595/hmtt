import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 在vue-cli创建的项目中  @的前缀 代表的是根路径 src目录
// 默认会去加载索引文件  index.js index.vue index.json  必须是index  因为只解析index
import router from '@/router'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 实例化根实例  render() 渲染APP组件   然后挂载到#app的容器内
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
