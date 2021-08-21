import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './types'
import { getPageListData, deletePageData, createNewData, editOldData } from '@/request/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    },
    changeUsersCount(state, payload) {
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
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const url = `${pageName}/list`
      const result = await getPageListData(url, payload.queryInfo)
      const { list, totalCount } = result.data
      console.log(pageName)

      const getPageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${getPageName}List`, list)
      commit(`change${getPageName}Count`, totalCount)
    },
    async deletePageDataAction({ commit, dispatch }, payload: any) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      await deletePageData(url)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
