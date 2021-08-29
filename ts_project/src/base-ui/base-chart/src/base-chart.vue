<template>
  <div class="chart-wrapper">
    <div class="chart-ref" ref="chartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, watch, onMounted, watchEffect, onUnmounted } from 'vue'
import { useEcharts } from '../hooks/use-charts'
export default {
  name: '',
  components: {},
  props: {
    width: { type: String, default: '100%' },
    height: { type: String, default: '350px' },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const echartRef = ref<HTMLElement>()
    let resizeFn: any
    onMounted(() => {
      const [setOptions, resizeHandler] = useEcharts(echartRef.value!)
      resizeFn = resizeHandler
      watchEffect(() => {
        setOptions(props.options)
      })
      window.addEventListener('resize', resizeFn)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resizeFn)
    })
    return { echartRef }
  }
}
</script>
