<template>
  <div class="role">
    <common-form :formConfig="formConfig" formHeader="角色列表搜索"></common-form>
    <common-content :tableConfig="tableConfig" pageName="role" @create="handleCreateItem" @edit="handleEditItem"></common-content>
    <common-dialog :formConfig="dialogFormConfig" pageName="role" :formDefaultInfo="formDefaultInfo" :otherInfo="otherInfo" ref="dialogRef">
      <div class="menu-tree">
        <el-tree ref="elTreeRef" :data="treeMenus" show-checkbox node-key="id" :props="{ children: 'children', label: 'name' }" @check="handleCheckChange"> </el-tree>
      </div>
    </common-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import { ElTree } from 'element-plus'

import CommonContent from '@/components/common-content/index'
import CommonForm from '@/components/common-form/index'
import CommonDialog from '@/components/common-dialog/index'

import { tableConfig } from './config/table'
import { formConfig } from './config/form'
import { dialogFormConfig } from './config/dialog'
import { useDialogSearch } from '@/hooks/dialog-search'

import { menuMapLeafKeys } from '@/utils/map-menus'
export default defineComponent({
  name: 'role',
  components: { CommonContent, CommonForm, CommonDialog },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    const store = useStore()
    store.dispatch('getInititalDataAction')
    const treeMenus = computed(() => store.state.rolesMenus)
    // 回显表格中树形控件中的数据
    const otherInfo = ref({})
    const handleCheckChange = (data: any, data2: any) => {
      // data 当前选中项以及子选项的信息
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const list = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList: list }
    }
    // 点击编辑按钮 对应的权限菜单数据处理
    const editCallBack = (item: any) => {
      let leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        // el-tree的实例方法 根据绑定的node-key 来找到 当前已选项的key
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    let [dialogRef, handleCreateItem, handleEditItem, formDefaultInfo] = useDialogSearch(undefined, editCallBack)

    return {
      dialogRef,
      elTreeRef,
      tableConfig,
      formConfig,
      dialogFormConfig,
      formDefaultInfo,
      otherInfo,
      treeMenus,
      handleCreateItem,
      handleEditItem,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
