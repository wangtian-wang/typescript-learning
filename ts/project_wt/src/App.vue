<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style lang="less">
html,
body {
  height: 100vh;
  margin: 0;
  padding: 0;
  #app {
    height: 100%;
    .app {
      height: 100%;
    }
  }
}
</style>
