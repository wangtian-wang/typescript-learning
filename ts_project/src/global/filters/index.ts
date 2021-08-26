import { App } from 'vue'
import { formatUtcString } from '@/utils/time-format'

export function registerTimeFilter(app: App) {
  app.config.globalProperties.$timeFilter = {
    timeFormatter: (val: string) => {
      return formatUtcString(val)
    }
  }
}
