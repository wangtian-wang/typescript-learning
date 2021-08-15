import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null
export const menuToRoutes = (menus: any[]): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []
  const routerFiles = require.context('../router/main', true, /\.ts/)
  routerFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  const matchMenuToRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        matchMenuToRoute(menu.children)
      }
    }
  }
  matchMenuToRoute(menus)
  return routes
}
export const getActiveMenu = (menus: any, currentPath: string) => {
  let activeMenu
  const findActiveMenu = (menus: any) => {
    for (const menu in menus) {
      if (menus[menu].children && menus[menu].children.length > 0) {
        for (const item of menus[menu].children) {
          if (item.url === currentPath) activeMenu = item.url
        }
      }
    }
  }
  findActiveMenu(menus)
  return activeMenu
}
export const getBreadCrumbs = (menus: any[], currenRoute: string) => {
  const crumbs: IBreadcrumb[] = []
  const findItem = () => {
    for (const key in menus) {
      const item = menus[key]
      if (item.type === 1) {
        const subItem = item.children.find((sub: any) => sub.url === currenRoute)
        if (subItem) {
          crumbs.push({ name: item.name })
          crumbs.push({ name: subItem.name })
          return subItem
        }
      } else if (item.type === 2 && item.url === currenRoute) {
        return item
      }
    }
  }
  findItem()
  return crumbs
}
export { firstMenu }
