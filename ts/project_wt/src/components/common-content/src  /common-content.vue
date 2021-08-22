<template>
  <div class="common-content">
    <base-table v-bind="tableConfig" :tableData="pageListData" :list-count="pageListCount" v-model:page="pageInfo">
      <template #headerHandler>
        <el-button type="primary" size="medium" @click="handleCreate"> 新建用户</el-button>
      </template>
      <template #status="scope">
        <el-button plain size="mini" :type="scope.row.enable ? 'success' : 'danger'">{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $timeFilter.timeFormatter(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $timeFilter.timeFormatter(scope.row.createAt) }}</span>
      </template>
      <template #handler="scope">
        <el-button icon="el-icon-edit" size="mini" type="text" @click="handleEdit(scope.row)"> 编辑</el-button>
        <el-button icon="el-icon-delete" size="mini" type="text" @click="handleDelete(scope.row)"> 删除</el-button>
      </template>
      <template v-for="other in otherPropsSlots" :key="other.prop" #[other.slotName]="scope">
        <template>
          <slot :name="other.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </base-table>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch, defineComponent } from 'vue'
import BaseTable from '@/base-ui/base-table/index'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'CommonContent',
  components: {
    BaseTable
  },
  props: {
    pageName: {
      type: String,
      require: true
    },
    tableConfig: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    /** 双向绑定pageinfo  页码发生变化 重新获取数据*/
    const pageInfo = ref({ curPage: 1, pageSize: 10 })
    watch(pageInfo, () => getData())

    /**调用store里面的方法 获取数据 */
    const getData = (queryInfo) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.curPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo // 多条件查询
        }
      })
    }
    getData()
    /** 从store里面获取数据 */
    const pageListData = computed(() => store.getters[`system/pageListData`](props.pageName))
    const pageListCount = computed(() => store.getters[`system/pageListCount`](props.pageName))
    console.log(pageListData, pageListCount)

    const handleEdit = (data) => {}
    const handleDelete = (data) => {}
    return { getData, pageListData, pageListCount, handleEdit, handleDelete }
  }
})
</script>
