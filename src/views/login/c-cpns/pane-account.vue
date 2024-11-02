<!--
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-21 17:03:13
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-21 22:49:15
 * @FilePath: \vue3-ts-cms\src\views\login\c-cpns\pane-account.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pane-account">
    <el-form ref="formRef" :model="account" :rules="accountRules" label-width="60px" size="large" status-icon>
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import useLoginStore from '@/store/login/login';
import type { IAccount } from '../types';
import { localCache } from '@/utils/cache';

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? "",
  password: localCache.getCache('password') ?? ""
})
const loginStore = useLoginStore()

const formRef = ref<InstanceType<typeof ElForm>>()

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      console.log("验证失败")
      ElMessage.error("输入正确的格式再登录")
    }
  })
}


const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
