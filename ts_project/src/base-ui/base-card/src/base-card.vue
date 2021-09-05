<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span> {{ title }}</span>
      </div>
    </template>
    <div class="card-content">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
import { reactive, ref, computed, watch } from 'vue'

export default {
  name: 'BaseCard',
  props: {
    title: String
  },
  setup(props, { emit }) {
    return {}
  }
}
</script>
<style lang="less" scoped>
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.card-content {
  margin-bottom: 10px;
}
</style>
