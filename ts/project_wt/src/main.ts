import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { registerGlobal } from './global/index'
import { axios } from './request/index'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(registerGlobal)

app.mount('#app')
axios.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptors: (config) => {
      console.log('单独请求的config')
      return config
    },
    responseInterceptors: (res) => {
      console.log('单独响应的response')
      return res
    }
  }
})
// import axios from 'axios'
// axios({
//   method: 'GET',
//   url: '/home/multidata',
//   baseUrl: 'http://123.207.32.32:8000/'
// }).then((res) => {
//   console.log('------', res)
// })
