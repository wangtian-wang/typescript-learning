import type { App } from 'vue'
import { registerElCompoenets } from './element/index'
export function registerGlobal(app: App): void {
  registerElCompoenets(app)
}
