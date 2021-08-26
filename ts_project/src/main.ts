import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { initStore } from './store'

import { registerGlobal } from './global/index'
const app = createApp(App)
app.use(registerGlobal)

app.use(store)
initStore() //当每次刷新的时候，从localstorage里面同步store里面的值

app.use(router) // 因为每次刷新的时候 都需要先从store里面取出动态添加的路由，所以必须将store的初始化放在router之前

// app.config.globalProperties 全局通用配置 相当于 vue.prototype.$props
app.mount('#app')
/*

v-slot={prop}   匿名作用域插槽
slot-scope={prop} name="goodsslot"   具名作用域插槽


*/
