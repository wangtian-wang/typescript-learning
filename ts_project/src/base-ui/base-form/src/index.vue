<template>
  <div id="base-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="form-wrapper">
      <el-form :label-position="labelPosition">
        <el-row v-bind="colLayout">
          <template v-for="item in formItems" :key="item.field">
            <el-form-item v-if="!item.isHidden" :label="item.label" :rules="item.rules ? item.rules : {}" :style="itemStyles">
              <template v-if="item.type == 'text' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @input="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :style="item.cssStyle"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option v-for="option in item.options" :key="option.value" :value="option.value" :label="option.title || option.label"> </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :style="item.cssStyle"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'checkbox'">
                <el-input
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :style="item.cssStyle"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
            </el-form-item>
          </template>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch, nextTick, toRefs } from 'vue'

import { IFromItem } from '../types/index'
export default {
  name: 'Home',
  props: {
    // 中间层组件传递给 base form 组件  使用双向绑定  到 base form input上 的属性
    modelValue: {
      type: Object,
      require: true
    },
    // 一共需要渲染多少个不同类型的表单控件
    formItems: {
      type: IFromItem,
      default: () => []
    },
    /* 绑定到表单控件上面的公共属性  */
    labelWidth: {
      type: String,
      default: '100px'
    },
    /* 绑定到表单控件上面的公共属性  */
    itemStyles: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },

    /* 绑定到表单控件上面的公共属性  */
    labelPosition: {
      type: String,
      default: 'top'
    },
    /* 绑定到 el-row上面的公共属性  */
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  components: {},
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleValueChange = (value, field) => {
      /** 动态的更新父组件的 表单绑定数据输入的值 */
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  }
}
</script>
