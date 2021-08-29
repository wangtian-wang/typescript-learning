import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

// 注册中国地图
import chinaJson from '../data/china.json'
echarts.registerMap('china', chinaJson)
export const useEcharts = (echartRef: HTMLElement, theme = 'light') => {
  const echartInstance = echarts.init(echartRef, theme, { renderer: 'svg' })
  const setOptions = (options: any) => {
    echartInstance.setOption(options)
  }
  const resizeHandler = () => {
    echartInstance.resize()
  }
  // window.addEventListener('resize', resizeHandler, false)
  return [setOptions, resizeHandler]
}
