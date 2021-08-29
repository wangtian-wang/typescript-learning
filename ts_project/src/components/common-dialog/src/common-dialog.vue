<template>
  <div id="common-dialog-wrapper">
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="30%" center destroy-on-close>
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
import { useStore } from 'vuex'
import BaseForm from '@/base-ui/base-form/index'
import { formatUtcString } from '@/utils/time-format'
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
    selectedRolesIdArray: {
      type: Object,
      default: () => {}
    },
    dialogTitle: {
      type: String,
      default: '新建'
    }
  },
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const formData = ref({})
    watch(
      () => props.formDefaultInfo,
      (newInfo) => {
        /** 这块的逻辑有点不合理 1： 表单中使用双向绑定 绑定的值在新建用户 和编辑用户 时候 显示的字段不一样 */
        /** formDefaultInfo 是吗，每次点击 创建或者编辑的时候 传递出来的值 当新建的时候 这个  defaultInfo是一个空对象 此时表单元素双向绑定的是undefined */
        /** 监听 form-item 里面的input 绑定的字段 当这个值发生变化的时候 将表单默认配置里面要显示的字段 的值 显示到input 输入框里面 */
        for (const key of props.formConfig.formItems) {
          formData.value[`${key.field}`] = newInfo[`${key.field}`]
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    const store = useStore()

    // 点击弹框的确认按钮 将当前 新建 或者编辑的信息 提交到服务器里面
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.formDefaultInfo).length > 0) {
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.selectedRolesIdArray },
          id: props.formDefaultInfo.id
        })
      } else {
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.selectedRolesIdArray }
        })
      }
    }
    return {
      formData,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>
