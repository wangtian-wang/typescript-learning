import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './types'
import { getPageListData } from '@/request/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0
  },
  mutations: {
    changeUserList(state, payload) {
      state.usersList = payload
    },
    changeUserCount(state, payload) {
      state.usersCount = payload
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const url = `${pageName}/list`
      const result = await getPageListData(url, payload.queryInfo)
      const { list, totalCount } = result.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
