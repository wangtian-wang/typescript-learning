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
