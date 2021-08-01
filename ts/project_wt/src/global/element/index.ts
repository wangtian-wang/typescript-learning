import 'element-plus/lib/theme-chalk/base.css'
import type { App } from 'vue'
import { ElButton } from 'element-plus'
const components = [ElButton]
export function registerElCompoenets(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
