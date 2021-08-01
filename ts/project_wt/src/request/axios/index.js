import axios from 'axios'

class Request {
  instance = null
  interceptors = null
  showLoading = null
  loading = false
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors || null
    this.showLoading = config.showLoading ?? true
    /**
     this.instance.interceptors.use 调用axios 实例上面的方法，执行传入的自定义拦截器
     按照代码的执行顺序，是传入的自定义的拦截器先执行
     */
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptors, this.interceptors?.requestInterceptorError)
    this.instance.interceptors.response.use(this.interceptors?.reponseInterceptors, this.interceptors?.reponseInterceptorError)

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        console.warn('request error')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        if (response.returnCode === '-10000') {
          return console.warn(`请求失败 ： ${response.messages}`)
        }
        return response.data
      },
      (error) => {
        if (!error) return
        let statusCode = error.status
        let message = error.message
        switch (statusCode) {
          case 401:
            console.warn('未授权')
            break
          default:
            break
        }
        return error
      }
    )
  }
  /*
    使用axios内部的 request方法 重新封装了request方法
    request方法特性：
      可以自己定义拦截器

  */
  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance.request(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          this.showLoading = true
          resolve(res)
        },
        (rej) => {
          this.showLoading = false
          reject(rej)
          return rej
        }
      )
    })
  }
  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
}
export default Request
