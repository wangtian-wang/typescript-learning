import Request from './axios/index.js'
import { BASE_URL, TIME_OUT } from './axios/config.ts'
export let axios = new Request({
  baseUrl: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('config in new request requestInterceptors', config)
      return config
    },
    requestInterceptorError: (error) => {
      console.log('error in new request requestInterceptorError', error)
      return error
    },
    reponseInterceptors: (res) => {
      console.log('res in reponseInterceptors', res)
      return res
    },
    reponseInterceptorError: (error) => {
      console.log('error in reponseInterceptorError', error)
      return error
    }
  }
})
