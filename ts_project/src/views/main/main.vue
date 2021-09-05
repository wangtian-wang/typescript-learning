<template>
  <div id="main">
    <el-container class="page-container">
      <el-aside :width="isCollapse ? '50px' : '200px'">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="main-page">
        <el-header>
          <nav-header @fold-change="foldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavHeader from '@/components/nav-header'
import NavMenu from '@/components/nav-menu'
export default defineComponent({
  created() {
    console.log('main created')
  },
  components: {
    NavHeader,
    NavMenu
  },
  setup() {
    const isCollapse = ref(false)
    const foldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      foldChange
    }
  }
})
</script>

<style scoped lang="less">
#main {
  height: 100%;
  overflow: auto;
  .page-info {
    height: 100%;
  }
}
.el-header {
  padding: 0;
}
.page-container {
  height: 100%;
}
</style>
