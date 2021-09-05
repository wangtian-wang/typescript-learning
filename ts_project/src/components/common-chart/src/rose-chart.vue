<template>
  <div class="rose-chart-wrapper">
    <base-chart :options="options"></base-chart>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, watch, PropType } from 'vue'
import BaseChart from '@/base-ui/base-chart/src/base-chart.vue'
import { IPiechartData } from '../types'
export default {
  name: '',
  components: { BaseChart },
  props: {
    roseData: {
      type: Array as PropType<IPiechartData[]>,
      default: () => []
    }
  },
  setup(props: any) {
    const options = computed(() => {
      return {
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '类别数据',
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      }
    })
    return { options }
  }
}
</script>
