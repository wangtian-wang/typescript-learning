import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { getPageListData } from '@/request/main/system/system'
import { IRootState, IStoreType } from './type'
// store module
import login from './login/login'
import system from './main/system/system'
// localestorage utils
import localCache from '@/utils/getCache'

const store = createStore<IRootState>({
  state() {
    return {
      rolesArray: [], // 用户管理页面 新建用户的 角色数据
      rolesMenus: [], // 角色管理 角色数据
      department: [] // 用户管理页面 新建用户的 部门数据
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
    async getInititalDataAction({ commit, dispatch }) {
      if (dispatch('initData')) return

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

      localCache.setCache('departmentList', departmentList)
      localCache.setCache('menuList', menuList)
      localCache.setCache('roleList', roleList)

      commit('changeDepartment', departmentList)
      commit('changeRolesMenus', menuList)
      commit('changeRolesArray', roleList)
    },
    initData({ commit }) {
      const departmentList = localCache.getCache('departmentList')
      const menuList = localCache.getCache('menuList')
      const roleList = localCache.getCache('roleList')
      if (!departmentList || !menuList || !roleList) {
        return false
      } else {
        commit('changeDepartment', departmentList)
        commit('changeRolesMenus', menuList)
        commit('changeRolesArray', roleList)
        return true
      }
    }
  },
  modules: {
    login,
    system
  }
})
export function initStore() {
  store.dispatch('login/initStore')
  store.dispatch('getInititalDataAction')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
