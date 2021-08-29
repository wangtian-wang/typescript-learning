import { ref } from 'vue'

import CommonDialog from '@/components/common-dialog'
type CallBackFn = (item?: any) => void
export function useDialogSearch(createCb?: CallBackFn, editCb?: CallBackFn) {
  const dialogRef = ref<InstanceType<typeof CommonDialog>>()
  const formDefaultInfo = ref({})
  /** 应该将初始化表单配置拿到 在这里面进行初始化 但是需要声明一个类型 formDefaultInfo*/
  const handleCreateItem = () => {
    formDefaultInfo.value = {}
    if (dialogRef.value) {
      dialogRef.value.dialogVisible = true
    }
    createCb && createCb()
  }
  const handleEditItem = (item: any) => {
    formDefaultInfo.value = { ...item }
    if (dialogRef.value) {
      dialogRef.value.dialogVisible = true
    }

    editCb && editCb(item)
  }
  return [dialogRef, handleCreateItem, handleEditItem, formDefaultInfo]
}
