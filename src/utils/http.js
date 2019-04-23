import axios from 'axios'

axios.defaults.baseURL = `http://47.96.21.88:8086`

// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
      // 在发送请求之前做些什么
      if(config.url === '/login' || config.url === 'homes/swipe'){
        return config
      }else {
        const token = window.localStorage.getItem('token')
        config.headers.Authorization = token // 请求头需要带token认证
        return config
      }
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  axios.interceptors.response.use(
    function(response) {
      // 对响应数据做点什么
      return response.data
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )

  export default axios
