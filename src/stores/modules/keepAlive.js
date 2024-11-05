// src/stores/modules/keepAlive.js
import { defineStore } from 'pinia'

export const useKeepAliveStore = defineStore('keepAlive', {
  state: () => ({
    keepAliveComponentsName: [], // 需要缓存的组件名称
  }),

  getters: {
    // 返回需要缓存的组件名称
    getKeepAliveComponentsName(state) {
      return state.keepAliveComponentsName
    },
  },

  actions: {
    // 重置，Push, splice keep-alive对象
    setKeepAliveComponentsName(nameArr) {
      this.keepAliveComponentsName = nameArr // 直接更新状态
    },

    addKeepAliveComponentsName(name) {
      this.keepAliveComponentsName.push(name) // 直接更新状态
    },

    delKeepAliveComponentsName(name) {
      const key = this.keepAliveComponentsName.indexOf(name)
      if (key !== -1) {
        this.keepAliveComponentsName.splice(key, 1) // 直接更新状态
        console.log(this.keepAliveComponentsName)
      }
    },
  },
})
