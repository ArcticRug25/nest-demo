<script setup lang="ts">
import { computed, reactive } from 'vue'
import axios from '@/utils/axios'

const loginInfo = reactive({
  username: '',
  password: '',
  usernameMsg: '',
  passwordMsg: computed(() => {
    if (loginInfo.password !== '' && loginInfo.password.length < 6)
      return '密码的长度不能小于6位'

    return ''
  }),
})
const submit = () => {

}
const data = await axios.get('/user')
// console.log('🚀 ~ file: index.vue:4 ~ data', data)
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="col-11 col-sm-8 col-lg-6 col-xl-4 col-xxl-4">
      <form class="border shadow-sm rounded p-4">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">用户名：</label>
          <input id="exampleInputEmail1" v-model="loginInfo.username" type="email" class="form-control" :class="[{ 'is-invalid': loginInfo.usernameMsg }]" aria-describedby="emailHelp">
          <div class="invalid-feedback">
            {{ loginInfo.usernameMsg }}
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">密码：</label>
          <input id="exampleInputPassword1" v-model="loginInfo.password" type="password" class="form-control" :class="[{ 'is-invalid': loginInfo.passwordMsg }]">
          <div class="invalid-feedback">
            {{ loginInfo.passwordMsg }}
          </div>
        </div>
        <div class="mb-3 form-check">
          <input id="exampleCheck1" type="checkbox" class="form-check-input">
          <label class="form-check-label" for="exampleCheck1">记住我</label>
        </div>
        <div class="d-flex flex-column align-items-center px-1">
          <button type="submit" class="btn btn-primary w-100 mb-2 text-light" @click="submit()">
            登录
          </button>
          <router-link to="/reg" class="border rounded w-100 text-decoration-none text-center">
            <button type="submit" class="btn">
              注册
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
