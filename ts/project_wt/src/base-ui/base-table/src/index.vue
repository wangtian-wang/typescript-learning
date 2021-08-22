<template>
  <div id="base-table">
    <div class="table-header">
      <slot name="header">
        <h1 class="header-title">{{ title }}</h1>
        <slot name="headerHandler"></slot>
      </slot>
    </div>
    <el-table :data="tableData" tooltip-effect="light" @select-all="handleSelectChange" :height="tableHeight" v-bind="childrenProps" :border="border">
      <el-table-column v-if="showIndex" type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column v-if="showSelection" type="selection" width="55"> </el-table-column>
      <template v-for="item in tableConfigList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          :layout="tableLayout"
          :total="listCount"
        >
        </el-pagination>
        <slot name="footerHandler"> </slot>
      </slot>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from 'vue'
import { ElTable } from 'element-plus'
export default {
  name: '',
  components: {},
  props: {
    title: {
      type: String,
      default: '表格标题'
    },
    tableLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    border: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableConfigList: {
      type: Array,
      default: () => []
    },
    tableHeight: {
      type: String,
      default: '300px'
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => {}
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    listCount: {
      type: Number,
      default: 0
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleCurrentChange = (val) => {
      emit('update:page', { ...props.page, currentPage: val })
    }
    const handleSizeChange = (val) => {
      emit('update:page', { ...props.page, pageSize: val })
    }
    const handleSelectChange = (val) => {
      emit('selectionChange', val)
    }
    return { handleSizeChange, handleCurrentChange, handleSelectChange }
  }
}
</script>
