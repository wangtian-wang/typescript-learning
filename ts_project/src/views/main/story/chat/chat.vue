<template>
  <h2>输入你的故事，分享成就精彩人生</h2>
  <base-editor v-model:value="htmlStr"></base-editor>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import BaseEditor from '@/base-ui/base-editor/index'

export default defineComponent({
  name: 'chat',
  components: { BaseEditor },
  setup(props, { emit }) {
    const htmlStr = ref<string>('请输入你的故事~~')
    return { htmlStr }
  }
})
</script>

<style scoped></style>
