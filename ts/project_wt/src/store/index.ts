import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { getPageListData } from '@/request/main/system/system'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      rolesArray: [],
      rolesMenus: [],
      department: []
    }
  },
  mutations: {
    changeDepartment(state, list) {
      state.department = list
    },
    changeRolesMenus(state, list) {
      state.rolesMenus = list
    },
    changeRolesArray(state, list) {
      state.rolesArray = list
    }
  },
  getters: {},
  actions: {
    async getInititalDataAction({ commit }) {
      // 部门数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeDepartment', departmentList)
      commit('changeRolesMenus', menuList)
      commit('changeRolesArray', roleList)
    }
  },
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
