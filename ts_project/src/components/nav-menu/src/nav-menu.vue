<template>
  <div id="nav-menu">
    <div class="logo">
      <div v-if="!isCollapse" class="title">manager</div>
    </div>
    <el-menu
      router
      :uniqueOpened="true"
      :default-active="defaultMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="item in userMenu" :key="item.id">
        <template v-if="item.type === 1">
          <el-submenu :index="item.id + ''">
            <template #title>
              <i :class="item.icon ? item.icon : 'el-icon-location'"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children" :key="child.id + ''">
              <!-- <i :class="child.icon ? child.icon : 'el-icon-location'"></i> -->
              <el-menu-item :index="child.url">{{ child.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i :class="item.icon ? item.icon : 'el-icon-menu'"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

import { getActiveMenu } from '@/utils/map-menus'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenu = computed(() => store.state.login.userMenu)

    const router = useRouter()
    const route = useRoute()
    const currentRoute = route.path

    /*
     将当前点击的菜单和当前的路由对应起来
     当不刷新的时候，点击menu，页面显示对应的路由  无需手动匹配
     当刷新的时候，或者通过地址栏切换路由的时候 本质上都是当前的路由在变化 所以需要找到当前的路由项，对应的menu
     */

    const activeMenu = getActiveMenu(store.state.login.userMenu, currentRoute)
    let defaultMenu = ref(activeMenu)
    //defaultMenu 是  <el-menu-item index="2"> 的index属性
    // 将当前选择的菜单 存储到storage里面
    const handleSelect = (index: string, indexPath: string, item: any, routeResult: any) => {
      localStorage.setItem('activeMenu', index)
    }
    return {
      userMenu,
      defaultMenu,
      handleSelect
    }
  }
})
</script>

<style scoped lang="less">
#nav-menu {
  height: 100%;
  background-color: #545c64;
  .title {
    color: #fff;
    padding-left: 50px;
    line-height: 44px;
  }
}
</style>
<style lang="less">
#nav-menu {
  .el-menu {
    border-right: none;
  }
}
</style>
