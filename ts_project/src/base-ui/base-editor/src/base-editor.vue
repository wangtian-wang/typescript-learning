<template>
  <div class="chat-container" ref="editorRef"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import Editor from 'wangeditor'
import type from 'wangeditor'
import editro from 'wangeditor'
interface EditorInfo {
  html: string
  text: string
}

export default defineComponent({
  name: 'chat',
  props: {
    value: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 0
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    // editorRef 用来初始化editor的DOM元素
    const editorRef = ref<InstanceType<any>>(null)
    // instance 初始化editor后返回的实例对象
    const editorInstance = ref<Editor | null>(null)
    const isInitContent = ref<boolean>(false)
    const content = reactive<EditorInfo>({
      html: '',
      text: ''
    })
    watch(
      () => props.value,
      () => {
        initEditor(props.value, true)
      }
    )
    /** 只有当editor的状态为focus的时候 才能实时更新父组件的数据 */
    const initEditor = (htmlStr: string, isFocus = false) => {
      if (!editorInstance.value) return
      const editor: Editor = editorInstance.value as Editor
      editor.config.focus = isFocus
      if (!htmlStr) return
      isInitContent.value = true
      editor.txt.html(htmlStr)
    }
    onMounted(() => {
      createEditor()
    })
    onBeforeUnmount(() => {
      if (!editorInstance.value) return
      editorInstance.value.destroy()
      editorInstance.value = null
    })
    const setEditorConfig = () => {
      if (!editorInstance.value) return
      const editor: Editor = editorInstance.value as Editor
      editor.config.height = props.height
      editor.config.zIndex = props.zIndex
      editor.config.focus = props.focus || true
      editor.config.onchange = function (newHtmlStr: string) {
        content.html = newHtmlStr
        content.text = editor.txt.text()
        if (!isInitContent.value) {
          emit('update:value', content.html)
        }
        isInitContent.value = false
      }
      editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'image',
        'video',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo'
      ]
      editor.config.onchangeTimeout = 500
    }
    const createEditor = () => {
      editorInstance.value = new Editor(editorRef.value)
      setEditorConfig()
      editorInstance.value.create()
      initEditor(props.value, true)
    }
    return { editorRef }
  }
})
</script>

<style scoped></style>
