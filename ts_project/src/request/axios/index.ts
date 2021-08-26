import axios from 'axios'
import AxiosInstance from 'axios'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { IRequesetInterceptors, IRequestConfig } from './types'
class Request {
  instance: AxiosInstance
  interceptors?: IRequesetInterceptors
  showLoading: boolean
  loading?: ILoadingInstance
  constructor(config: IRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    /**
     this.instance.interceptors.use 调用axios 实例上面的方法，执行传入的自定义拦截器
     按照代码的执行顺序，是传入的自定义的拦截器先执行
     */
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptors, this.interceptors?.requestInterceptorError)
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptors, this.interceptors?.responseInterceptorError)

    this.instance.interceptors.request.use(
      (config: any) => {
        return config
      },
      (error: any) => {
        console.warn('request error')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response: any) => {
        if (response.returnCode === '-10000') {
          return console.warn(`请求失败 ： ${response.messages}`)
        }
        return response.data
      },
      (error: any) => {
        if (!error) return
        const statusCode = error.status
        const message = error.message
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
  request<T>(config: IRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance.request(config).then(
        (res: any) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          this.showLoading = true
          resolve(res)
        },
        (rej: any) => {
          this.showLoading = false
          reject(rej)
          return rej
        }
      )
    })
  }
  get<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default Request
