<template>
  <div class="user">
    <common-form :formConfig="formConfig" :formHeader="formHeader" @searchForm="handleSearchForm" @resetForm="handleResetClick"></common-form>
    <common-content ref="commonContentRef" pageName="users" :tableConfig="tableConfig"> </common-content>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import CommonForm from '@/components/common-form/index'
import CommonContent from '@/components/common-content/index'

import { formConfig } from './config/search'
import { tableConfig } from './config/table'
/** utils */
import { useFormSearch } from '@/hooks/form-search'
export default defineComponent({
  name: 'users',
  components: {
    CommonForm,
    CommonContent
  },
  setup() {
    const store = useStore()
    const formHeader = ref('用户搜索表单')

    const [commonContentRef, handleResetClick, handleSearchForm] = useFormSearch()
    const selectionChange = (seletedItem: any) => {
      console.log(seletedItem)
    }

    return {
      formConfig,
      tableConfig,
      formHeader,
      commonContentRef,
      selectionChange,
      handleSearchForm,
      handleResetClick
    }
  }
})
</script>

<style scoped></style>
