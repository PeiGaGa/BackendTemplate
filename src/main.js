import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/dist/index.css'
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import './theme/modules/chinese/index.scss'

import App from './App.vue'
import router from './router'
import { useAppStore } from './stores/modules/app' // 修改为正确的导入路径

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
app.use(pinia)
app.use(router)

// 在这里获取 Pinia store 的实例
const appStore = useAppStore() // 确保使用正确的 store

// 使用 Pinia store 的状态来设置 ElementPlus 的大小
app.use(ElementPlus, { size: appStore.elementSize }) // 从 store 中获取 elementSize

app.mount('#app')
