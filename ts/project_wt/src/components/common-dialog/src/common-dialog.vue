<template>
  <div id="common-dialog-wrapper">
    <el-dialog title="新建用户" v-model="dialogVisible" width="30%" center destroy-on-close>
      <base-form v-bind="formConfig" v-model="formData"></base-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, defineComponent } from 'vue'

import BaseForm from '@/base-ui/base-form/index'
export default defineComponent({
  name: '',
  components: { BaseForm },
  props: {
    formConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    },
    /** 表单中显示的默认字段 */
    formDefaultInfo: {
      type: Object,
      default: () => {}
    },
    otherInfo: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const formData = ref({})
    watch(
      () => props.formDefaultInfo,
      (newInfo) => {
        /** 这块的逻辑有点不合理 1： 表单中使用双向绑定 绑定的值在新建用户 和编辑用户 时候 显示的字段不一样 */
        for (const key of props.formConfig.formItems) {
          formData.value[`${key.field}`] = newInfo[`${key.field}`]
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    const handleConfirmClick = () => {
      dialogVisible.value = false
    }
    return {
      formData,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>
