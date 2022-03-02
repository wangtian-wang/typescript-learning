<template>
  <div class="chat">
    <hy-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HyEditor from '@/base-ui/editor'

export default defineComponent({
  name: 'chat',
  components: {
    HyEditor
  },
  setup() {
    const htmlString = ref<string>('coderwhy')
    watch(htmlString, (newVal) => {
      console.log(newVal, 'newValnewVal')
    })
    return {
      htmlString
    }
  }
})
</script>

<style scoped></style>
