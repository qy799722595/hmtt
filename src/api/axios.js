// 封装axios
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // Headers: {
  //   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtt')).token
  // }
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // config   请求配置对象
  // 修改config
  // sessionStorage.getItem 读取('hmtt')中的数据
  const user = window.sessionStorage.getItem('hmtt')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 创建Promise对象的方式  new Promise() 结果可能成功也可能失败
  // Promise.resolve() 创建一个成功的Promise
  // Promise.reject() 创建一个失败的Promise
  // console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  // console.dir(error)
  return Promise.reject(error)
})

export default instance
