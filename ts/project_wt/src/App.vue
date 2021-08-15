<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {}
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
