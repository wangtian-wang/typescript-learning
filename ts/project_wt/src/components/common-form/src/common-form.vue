<template>
  <div id="form-wrapper">
    <base-form v-bind="formConfig" v-model="formData">
      <template #header>
        <h1>{{ formHeader }}</h1>
      </template>
      <template #footer>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleResetForm">重置</el-button>
          <el-button type="primary" @click="handleSearchForm">搜索</el-button>
        </div>
      </template>
    </base-form>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

import BaseForm from '@/base-ui/base-form'
export default defineComponent({
  props: {
    formConfig: {
      type: Object,
      require: true
    },
    formHeader: {
      type: String,
      require: true
    }
  },
  components: {
    BaseForm
  },
  setup(props, { emit }) {
    /** 动态获取不同field的表单字段 */
    let formData = {}
    const originFormData = props.formConfig?.formItems ?? []
    for (const item of originFormData) {
      formData[item.field] = ''
    }
    formData = ref(formData)

    /** 重置 */
    const handleResetForm = () => {
      for (const key in formData.value) {
        formData.value[key] = ''
      }
      emit('resetForm')
    }
    /** 搜索*/
    const handleSearchForm = () => {
      emit('searchForm', formData.value)
    }
    return {
      formData,
      handleResetForm,
      handleSearchForm
    }
  }
})
</script>

<style lang="less">
.btn-wrapper {
  display: flex;
  padding-right: 10%;
  justify-content: flex-end;
  align-items: center;
}
</style>
