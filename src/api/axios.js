// 封装axios
import axios from 'axios'
import JSONBig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // Headers: {
  //   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtt')).token
  // }
  // 这是处理js最大安全值的
  transformResponse: [(data) => {
    // 处理格式
    // data中可能没有数据  可能为null
    // 后台接口没有数据传输过来,jsonbig没有数据可以转换 转换空 有可能会报错
    // 所以要严谨判断  判断一下 如果有数据进行数据转换  没有数据则直接return
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
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
  // 如果响应状态码是 401 拦截到登录页面
  // error.response.status 状态码
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  // console.dir(error)
  return Promise.reject(error)
})

export default instance
