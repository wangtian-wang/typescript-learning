/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'axios' {
  import { axios } from './request/index'
  export default axios
}

declare module '*.js'
declare module '*.json'

interface Window {
  EventTarget
  windowTimers
}

declare var Date: DateConstructor

interface DateConstructor {
  new (): Date
  // 一些其他的构造函数签名

  now(): number
  say(): number

  // 其他成员函数
}
