<template>
  <div class="login-panel">
    <h1 class="title">超级管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="pc">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-pc ref="pcRef"></login-pc>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="input-wrapper">
      <el-radio-group v-model="KeepPassWard" @change="handleKeepPassWard">
        <el-radio label="记住密码"></el-radio>
        <el-radio label="暂不记住密码"></el-radio>
      </el-radio-group>
      <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import LoginPc from './login-pc.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  name: 'LoginPanel',
  components: {
    LoginPc,
    LoginPhone
  },
  setup() {
    const KeepPassWard = ref('记住密码')
    const pcRef = ref<InstanceType<typeof LoginPc>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('pc')
    const handleLoginClick = () => {
      if (currentTab.value === 'pc') {
        pcRef.value?.handlePcLogin(KeepPassWard.value)
      }
    }
    const handleKeepPassWard = (e: any) => {
      KeepPassWard.value = e
    }
    return {
      KeepPassWard,
      currentTab,
      pcRef,
      phoneRef,
      handleLoginClick,
      handleKeepPassWard
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .input-wrapper {
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
