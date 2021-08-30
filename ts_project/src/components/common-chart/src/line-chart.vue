<template>
  <div class="line-chart-wrapper">
    <base-chart :options="options"></base-chart>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, watch, PropType } from 'vue'
import { IEchartXAxisLabel, IEchartValueData } from '../types'
import BaseChart from '@/base-ui/base-chart/index'
export default {
  name: '',
  components: { BaseChart },
  props: {
    labels: {
      type: Array as PropType<IEchartXAxisLabel[]>,
      default: () => []
    },
    values: {
      type: Array as PropType<IEchartValueData[]>
    }
  },
  setup(props: any) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.labels
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '分类销量统计',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: props.values
          }
        ]
      }
    })
    return {
      options
    }
  }
}
</script>
