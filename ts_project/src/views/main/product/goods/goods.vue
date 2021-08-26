<template>
  <div class="goods">
    <h2>goods</h2>
    <common-content :tableConfig="tableConfig" pageName="goods">
      <template #image="scope">
        <el-image style="width: 60px; height: 60px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]"> </el-image>
      </template>
      <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
    </common-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { tableConfig } from './config/table'

import CommonContent from '@/components/common-content/index'
import CommonForm from '@/components/common-form/src/common-form.vue'
export default defineComponent({
  name: 'GoodPage',
  components: {
    CommonContent,
    CommonForm
  },
  setup() {
    return {
      tableConfig
    }
  }
})
</script>

<style scoped></style>
