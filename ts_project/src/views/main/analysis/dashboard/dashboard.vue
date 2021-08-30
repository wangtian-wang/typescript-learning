<template>
  <div class="dashboard">
    <!-- 顶部数据统计 -->
    <!-- 中间数据 饼图 地图 玫瑰图 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <!-- <pie-chart :pieData="categoryGoodsCount"></pie-chart> -->
      </el-col>
      <el-col :span="10">
        <!-- <map-chart :mapData="goodsAdressSale"></map-chart> -->
      </el-col>
      <el-col :span="7">
        <rose-chart :roseData="categoryGoodsCount"></rose-chart>
      </el-col>
    </el-row>
    <!-- 底部图表  柱状图 折线图 -->
    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <line-chart v-bind="categoryGoodsSale"></line-chart>
      </el-col>
      <el-col :span="12">
        <bar-chart v-bind="categoryGoodsSale"></bar-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import MapChart from '@/components/common-chart/src/map-chart.vue'
import pieChart from '@/components/common-chart/src/pie-chart.vue'
import roseChart from '@/components/common-chart/src/rose-chart.vue'
import LineChart from '@/components/common-chart/src/line-chart.vue'
import BarChart from '@/components/common-chart/src/bar-chart.vue'

export default defineComponent({
  components: { pieChart, MapChart, roseChart, LineChart, BarChart },
  name: 'dashboard',
  setup() {
    const store = useStore()
    store.dispatch('analysis/getAnslysisDataAction')
    const topPanelData = computed(() => store.state.analysis.topPanelDatas)
    const categoryGoodsCount = computed(() =>
      store.state.analysis.categoryGoodsCount?.map((item: any) => {
        return { value: item.goodsCount, name: item.name }
      })
    )
    const goodsSaleTop10 = computed(() => {
      return store.state.analysis.goodsSaleTop10?.map((item: any) => {
        return { value: item.saleCount, name: item.name }
      })
    })
    const goodsAdressSale = computed(() => {
      return store.state.analysis.goodsAdressSale?.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    const categoryGoodsSale = computed(() => {
      const goodsSale = store.state.analysis.categoryGoodsSale
      const labels: string[] = []
      const values: any[] = []
      for (const item of goodsSale) {
        labels.push(item.name)
        values.push(item.goodsCount)
      }
      return { labels, values }
    })
    return { topPanelData, categoryGoodsCount, goodsSaleTop10, categoryGoodsSale }
  }
})
</script>

<style scoped></style>
