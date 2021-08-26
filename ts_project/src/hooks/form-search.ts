import { ref } from 'vue'
import CommonContent from '@/components/common-content/index'
export function useFormSearch() {
  const commonContentRef = ref<InstanceType<typeof CommonContent>>()
  const handleResetClick = () => {
    commonContentRef.value?.getData()
  }
  const handleSearchClick = (queryInfo: any) => {
    commonContentRef.value?.getData(queryInfo)
  }
  return [commonContentRef, handleResetClick, handleSearchClick]
}
