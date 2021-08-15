<template>
  <div class="login-pc">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import localCache from '../../../utils/getCache'

export default defineComponent({
  name: 'LoginPc',
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('pwd') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const handlePcLogin = (isKeepPwd: string) => {
      formRef.value?.validate((res) => {
        if (res) {
          console.log(isKeepPwd, 'isKeepPwd')
          if (isKeepPwd === '记住密码') {
            localCache.setCache('name', account.name)
            localCache.setCache('pwd', encodeURIComponent(account.password))
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('login/handleLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      formRef,
      rules,
      handlePcLogin
    }
  }
})
</script>

<style></style>
