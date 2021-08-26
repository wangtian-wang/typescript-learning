<template>
  <div id="nav-header">
    <i class="fold-menu" :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="handleFoldClick"></i>
    <div class="content">
      <breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { getBreadCrumbs } from '@/utils/map-menus'

import UserInfo from './user-info.vue'
import Breadcrumb from '@/base-ui/breadcrumb/index'
export default defineComponent({
  components: { UserInfo, Breadcrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    const route = useRoute()
    let breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenu
      const currenRoute = route.path
      return getBreadCrumbs(userMenus, currenRoute)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
#nav-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebe5e5;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
