<template>
  <div class="common-content">
    {{ pageName }}
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'CommonContent',
  components: {},
  props: {
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = ref({ curPage: 1, pageSize: 10 })
    /**调用store里面的方法 获取数据 */
    const getData = (queryInfo) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.curPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo // 多条件查询
        }
      })
    }
    getData()
    /** 从store里面获取数据 */
    const pageListData = computed(() => store.getters[`system/pageListData`](props.pageName))
    const pageListCount = computed(() => store.getters[`system/pageListCount`](props.pageName))
    console.log(pageListData, pageListCount)
    return { getData, pageListData, pageListCount }
  }
})
</script>
