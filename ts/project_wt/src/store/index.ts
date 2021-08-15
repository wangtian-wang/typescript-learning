import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
const store = createStore<IRootState>({
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})
export function initStore() {
  store.dispatch('login/initStore')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
