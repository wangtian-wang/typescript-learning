import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import { IRootState, IStoreType } from './type'

const store = createStore<IRootState>({
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})
export function initStore() {
  store.dispatch('login/initStore')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
