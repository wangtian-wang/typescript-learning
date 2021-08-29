<template>
  <div class="user">
    <common-form :formConfig="formConfig" :formHeader="formHeader" @search="handleSearchForm" @resetForm="handleResetClick"></common-form>
    <common-content ref="commonContentRef" pageName="users" :tableConfig="tableConfig" @create="handleCreateItem" @edit="handleEditItem"> </common-content>
    <common-dialog :dialogTitle="dialogConfig.title" :formConfig="dialogConfig" pageName="users" :formDefaultInfo="formDefaultInfo" ref="dialogRef"></common-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import CommonForm from '@/components/common-form/index'
import CommonContent from '@/components/common-content/index'
import CommonDialog from '@/components/common-dialog/index'

import { formConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogFormConfig } from './config/dialog'
/** utils */
import { useFormSearch } from '@/hooks/form-search'
import { useDialogSearch } from '@/hooks/dialog-search'
export default defineComponent({
  name: 'users',
  components: {
    CommonForm,
    CommonContent,
    CommonDialog
  },
  setup() {
    const store = useStore()
    const formHeader = ref('用户搜索表单')
    // 表单搜索功能
    const [commonContentRef, handleResetClick, handleSearchForm] = useFormSearch()

    // 动态从store里面获取需要的角色 和部门的数据
    const dialogConfig = computed(() => {
      const roleOption = dialogFormConfig.formItems?.find((item) => {
        return item.field === 'roleId'
      })
      // 角色数据
      if (roleOption) {
        roleOption.options = store.state.rolesArray.map((item: any) => {
          return { label: item.name, value: item.id }
        })
      }
      const departmentOptions = dialogFormConfig.formItems?.find((item) => item.field === 'departmentId')
      // 部门数据
      if (departmentOptions) {
        departmentOptions.options = store.state.department.map((item: any) => ({ label: item.name, value: item.id }))
      }
      return dialogFormConfig
    })
    // 点击新建时候 需要显示密码 弹框 点击编辑的时候 不需要显示密码弹框
    // 弹框新建编辑功能
    // 利用编辑 和新建的回调函数 出处理 在不同的操作下 表单里面要显示的内容
    const createCallback = () => {
      const pwdItem = dialogConfig.value?.formItems.find((item) => item.field === 'password')
      pwdItem && (pwdItem.isHidden = false)
    }
    const editCallBack = () => {
      const pwdItem = dialogConfig.value?.formItems.find((item) => item.field === 'password')
      pwdItem && (pwdItem.isHidden = true)
    }
    const [dialogRef, handleCreateItem, handleEditItem, formDefaultInfo] = useDialogSearch(createCallback, editCallBack)
    return {
      formConfig,
      tableConfig,
      dialogConfig,
      formHeader,
      commonContentRef,
      dialogRef,
      handleSearchForm,
      handleResetClick,
      handleCreateItem,
      handleEditItem,
      formDefaultInfo
    }
  }
})
</script>

<style scoped></style>
