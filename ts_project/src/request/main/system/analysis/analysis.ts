import { axios } from '../../../index'
enum AnalysisApi {
  amountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  goodsSaleTop10 = '/goods/sale/top10',
  goodsAdressSale = '/goods/address/sale'
}
export function getAmountList() {
  return axios.get({ url: AnalysisApi.amountList })
}
export function getCategoryGoodsCountList() {
  return axios.get({ url: AnalysisApi.categoryGoodsCount })
}
export function getCategoryGoodsSaleList() {
  return axios.get({ url: AnalysisApi.categoryGoodsSale })
}
export function getCategoryGoodsFavorList() {
  return axios.get({ url: AnalysisApi.categoryGoodsFavor })
}
export function getGoodsSaleTop10List() {
  return axios.get({ url: AnalysisApi.goodsSaleTop10 })
}
export function getGoodsAdressSale() {
  return axios.get({ url: AnalysisApi.goodsAdressSale })
}
