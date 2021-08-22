import type { App } from 'vue'
import { registerElCompoenets } from './element/index'
import { registerTimeFilter } from './filters/index'
export function registerGlobal(app: App): void {
  registerElCompoenets(app)
  registerTimeFilter(app)
}
