import { Module } from 'vuex'
import { IAnalysis } from './type'
import { IRootState } from '../../type'
import { getAmountList, getCategoryGoodsCountList, getCategoryGoodsSaleList, getCategoryGoodsFavorList, getGoodsSaleTop10List, getGoodsAdressSale } from '@/request/main/system/analysis/analysis'
import localCache from '@/utils/getCache'
const AnalysisModule: Module<IAnalysis, IRootState> = {
  namespaced: true,
  state() {
    return {
      topPanelDatas: [],
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      goodsAdressSale: [],
      goodsSaleTop10: []
    }
  },
  mutations: {
    changeTopPanelDatas(state, data) {
      state.topPanelDatas = data
    },
    chanegCategoryGoodsCount(state, data) {
      state.categoryGoodsCount = data
    },
    chanegCategoryGoodsFavor(state, data) {
      state.categoryGoodsFavor = data
    },
    chanegCategoryGoodsSale(state, data) {
      state.categoryGoodsSale = data
    },
    getGoodsAdressSale(state, data) {
      state.goodsAdressSale = data
    },
    getGoodsSaleTop10(state, data) {
      state.goodsSaleTop10 = data
    }
  },
  actions: {
    async getAnslysisDataAction({ commit, dispatch }) {
      const res: boolean = await dispatch('setPageData')
      if (res) return
      const topPanelDatas: any = await getAmountList()
      const adressSale: any = await getGoodsAdressSale()
      const top10List: any = await getGoodsSaleTop10List()
      const goodsCount: any = await getCategoryGoodsCountList()
      const goodsSale: any = await getCategoryGoodsSaleList()
      const goodsFavor: any = await getCategoryGoodsFavorList()
      commit('changeTopPanelDatas', topPanelDatas.data)
      commit('getGoodsAdressSale', adressSale.data)
      commit('getGoodsSaleTop10', top10List.data)
      commit('chanegCategoryGoodsCount', goodsCount.data)
      commit('chanegCategoryGoodsSale', goodsSale.data)
      commit('chanegCategoryGoodsFavor', goodsFavor.data)
      localCache.setCache('topPanelDatas', topPanelDatas.data)
      localCache.setCache('adressSale', adressSale.data)
      localCache.setCache('top10List', top10List.data)
      localCache.setCache('goodsCount', goodsCount.data)
      localCache.setCache('goodsSale', goodsSale.data)
      localCache.setCache('goodsFavor', goodsFavor.data)
    },
    setPageData({ commit }) {
      const topPanelDatas = localCache.getCache('topPanelDatas')
      const adressSale = localCache.getCache('adressSale')
      const top10List = localCache.getCache('top10List')
      const goodsCount = localCache.getCache('goodsCount')
      const goodsSale = localCache.getCache('goodsSale')
      const goodsFavor = localCache.getCache('goodsFavor')
      if (topPanelDatas || adressSale || top10List || goodsCount || goodsSale || goodsFavor) {
        commit('changeTopPanelDatas', topPanelDatas)
        commit('getGoodsAdressSale', adressSale)
        commit('getGoodsSaleTop10', top10List)
        commit('chanegCategoryGoodsCount', goodsCount)
        commit('chanegCategoryGoodsSale', goodsSale)
        commit('chanegCategoryGoodsFavor', goodsFavor)
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    }
  }
}
export default AnalysisModule
