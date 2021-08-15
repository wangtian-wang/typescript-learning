import type { AxiosRequestConfig, AxiosResponse } from 'axios/index'

export interface IRequesetInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorError?: (error: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorError?: (error: any) => any
}
export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IRequesetInterceptors<T>
  showLoading?: boolean
  baseUrl?: string
}
