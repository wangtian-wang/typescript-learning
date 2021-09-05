<template>
  <div>
    <base-chart :options="options"></base-chart>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from 'vue'
import BaseChart from '@/base-ui/base-chart/src/base-chart.vue'
import { covertData } from '../utils/conver-data'
export default {
  name: '',
  components: { BaseChart },
  props: {
    title: {
      type: String,
      default: ''
    },
    mapData: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    console.log(covertData(props.mapData)), '0000000'
    const options = computed(() => {
      return {
        backgroundColor: '#fff',
        title: {
          text: '全国统计销量',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ':' + params.value[2]
          }
        },
        visualMap: {
          min: 0,
          max: 60000,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          roam: 'scale',
          emphasis: {
            areaColor: '#f4cccc',
            borderColor: 'rgb(9,54,95)',
            itemStyle: {
              areaColor: '#f4cccc'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: covertData(props.mapData),
            symbolSize: 15,
            emphasis: {
              itemStyle: {
                borderColor: '#eee',
                borderWidth: 1
              }
            }
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
            }
          }
        ]
      }
    })
    return { options }
  }
}
</script>
