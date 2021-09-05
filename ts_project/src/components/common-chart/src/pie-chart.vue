<template>
  <div class="pie-wrapper">
    <base-chart :options="options"></base-chart>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from 'vue'
import BaseChart from '@/base-ui/base-chart/src/base-chart.vue'
export default {
  name: '',
  components: { BaseChart },
  props: {
    pieData: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    return { options }
  }
}
</script>
