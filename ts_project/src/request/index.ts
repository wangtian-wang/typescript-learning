import Request from './axios/index'
import { BASE_URL, TIME_OUT } from './axios/config'
import localCache from '@/utils/getCache'
export const axios = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorError: (error) => {
      return error
    },
    responseInterceptors: (res) => {
      return res
    },
    responseInterceptorError: (error) => {
      return error
    }
  }
})
