// src/stores/modules/user.js
import { defineStore } from 'pinia'
import { loginApi, getInfoApi, loginOutApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '', // 登录token
    info: {}, // 用户信息
  }),

  getters: {
    token: state => state.token,
  },

  actions: {
    // login by login.vue
    async login(params) {
      try {
        const res = await loginApi(params)
        this.token = res.data.token // 直接更新状态
        await this.getInfo({ token: res.data.token }) // 获取用户信息
        return res.data.token // 返回token
      } catch (err) {
        throw err // 抛出错误以供调用者处理
      }
    },

    // get user info after user logged in
    async getInfo(params) {
      try {
        const res = await getInfoApi(params)
        this.info = res.data.info // 直接更新状态
        return res.data.info // 返回用户信息
      } catch (err) {
        throw err // 抛出错误以供调用者处理
      }
    },

    // log out of the system after user clicks the loginOut button
    async loginOut() {
      try {
        await loginOutApi() // 调用登出 API
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        localStorage.removeItem('tabs')
        location.reload() // 刷新页面
      }
    },
  },
})
