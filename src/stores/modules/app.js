// stores/modules/app.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isCollapse: false, // 侧边栏是否收缩展示
    contentFullScreen: false, // 内容是否可全屏展示
    showLogo: true, // 是否显示Logo
    fixedTop: false, // 是否固定顶部, todo，暂未使用
    showTabs: true, // 是否显示导航历史
    expandOneMenu: true, // 一次是否只能展开一个菜单
    elementSize: 'small', // element 默认尺寸，支持官网 'large / default /small' 小参数
    lang: '', // 默认采用的国际化方案
    theme: {
      state: {
        style: 'default',
        primaryColor: '#409eff',
        menuType: 'side',
      },
    },
    menuList: [], // 菜单列表
  }),

  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse // 切换侧边栏状态
    },
    setFullScreen(value) {
      this.contentFullScreen = value // 设置全屏状态
    },
    setMenuList(arr) {
      this.menuList = arr // 更新菜单列表
    },
    changeState(option) {
      this[option.name] = option.value // 通用状态更新
    },
    setElementSize(size) {
      this.elementSize = size // 更新 ElementPlus 尺寸
    },
    setLanguage(lang) {
      this.lang = lang // 更新语言设置
    },
  },
})
