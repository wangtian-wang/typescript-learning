<template>
  <div class="page-content">
    <!-- v-bind="contentTableConfig 将父组件传递的属性 全部传递到子组件里面 子组件在props里面接收 如果子组件的props不显示声明某个属性，这个属性将被绑定到 当前传递属性的根元素上面 -->
    <hy-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="medium">新建用户</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button plain size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ scope.row.createAt }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ scope.row.updateAt }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button icon="el-icon-edit" size="mini" type="text">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="text">删除</el-button>
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import HyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    HyTable
  },
  emits: ['selectionChange'],
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit, attrs }) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
    // const userCount = computed(() => store.state.system.userCount)
    const selectionChange = (seletedItem: any) => {
      emit('selectionChange', seletedItem)
    }
    return {
      dataList,
      selectionChange
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
