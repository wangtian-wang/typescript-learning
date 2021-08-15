<template>
  <div class="user">
    <!-- <page-search :searchFormConfig="searchFormConfig" /> -->
    <page-content :contentTableConfig="contentTableConfig" pageName="users" @selectionChange="selectionChange"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'users',
  components: {
    // PageSearch,
    PageContent
  },
  setup() {
    const selectionChange = (seletedItem: any) => {
      console.log(seletedItem)
    }
    return {
      selectionChange,
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
