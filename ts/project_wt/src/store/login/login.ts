import { Module } from 'vuex'
import router from '@/router'
// types file
import { ILoginState } from './login-type'
import { IRootState } from '../type'
import { IAccount } from '@/request/login/login-type'
// url file
import { accountLogin, userInfo, userMenu } from '@/request/login/login'
// utils file
import localCache from '@/utils/getCache'
import { menuToRoutes } from '@/utils/map-menus.ts'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeMenu(state, menus) {
      state.userMenu = menus
      const routes = menuToRoutes(menus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async handleLoginAction({ commit, dispatch }, payload: IAccount) {
      const loginResult = await accountLogin(payload)
      let id: number, token
      if (loginResult.code == 0) {
        token = loginResult.data
        id = loginResult.data.id
        localCache.setCache('token', loginResult.data.token)
        commit('changeToken', token)
        // 登录拿到token后 直接获取权限菜单数据
        dispatch('getInititalDataAction', null, { root: true })
        const userInfoResult = await userInfo(id)
        if (userInfoResult && userInfoResult.data) {
          const info = userInfoResult.data
          commit('changeUserInfo', info)
          localCache.setCache('userInfo', info)
          const menuResult = await userMenu(info.role.id)
          if (menuResult && menuResult.data) {
            const menu = menuResult.data
            commit('changeMenu', menu)
            localCache.setCache('userMenu', menu)
          }
        }
        router.push('/main')
      } else {
        console.log('登录失败')
      }
    },
    initStore({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('changeMenu', userMenu)
      }
    }
  }
}
export default loginModule
