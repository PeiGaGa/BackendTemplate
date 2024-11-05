<template>
  <div title="系统设置" @click="drawerChange(true)">
    <i class="sfont system-shezhi"></i>
  </div>
  <el-drawer
    title="系统设置"
    v-model="drawer"
    size="300px"
    :show-close="false"
    direction="rtl"
  >
    <h3>整体风格设置</h3>
    <div class="theme-box">
      <theme-icon
        v-model:active="state.style"
        v-for="(row, index) in style"
        :key="index"
        :name="index"
        :tip="row.name"
        :logo="row.logo.background"
        :menu="row.menu.background"
        :header="row.header.background"
        :main="row.container.background"
        :activeColor="row.page.color"
      ></theme-icon>
    </div>
    <h3>主题色</h3>
    <div class="theme-box">
      <theme-color
        v-for="(item, key) in themeColorArr"
        v-model:active="state.primaryColor"
        v-model:activeTextColor="state.primaryTextColor"
        :key="key"
        :color="item.color"
        :textColor="item.textColor"
        :tip="item.tip"
      ></theme-color>
    </div>
    <h3>其他设置</h3>
    <div class="list">
      <div class="list-item" v-for="option in options" :key="option.name">
        <span>{{ option.name }}</span>
        <el-switch
          v-model="option.value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="change(option)"
        >
        </el-switch>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="js">
import { defineComponent, ref, reactive, watch } from 'vue'
import { useAppStore } from '@/stores/modules/app' // 引入 Pinia store
import themeIcon from './theme/theme-icon.vue'
import themeColor from './theme/theme-color.vue'
import { style } from '@/theme/index'

export default defineComponent({
  components: {
    themeIcon,
    themeColor,
  },
  setup() {
    const appStore = useAppStore() // 使用 Pinia store

    const state = reactive({
      style: appStore.theme.state.style,
      primaryColor: appStore.theme.state.primaryColor,
      primaryTextColor: appStore.theme.state.primaryTextColor,
    })

    const themeColorArr = [
      { color: '#409eff', textColor: '#fff', tip: '默认蓝' },
      { color: '#d60f20', textColor: '#fff', tip: '玫瑰红' },
      { color: '#ac25e6', textColor: '#fff', tip: '优雅紫' },
      { color: '#4dc86f', textColor: '#fff', tip: '故事绿' },
      { color: '#13c2c2', textColor: '#fff', tip: '明青' },
      { color: '#333', textColor: '#fff', tip: '极客黑' },
    ]

    const setTheme = () => {
      const userTheme = style[state.style]
      if (!userTheme) {
        console.warn(`未找到样式: ${state.style}`)
        return
      }

      const body = document.body
      body.setAttribute('data-theme', state.style)
      body.style.setProperty('--system-primary-color', state.primaryColor)
      for (const key in userTheme) {
        if (key === 'name') continue
        const item = userTheme[key]
        for (const property in item) {
          const cssVarName = `--system-${key}-${property.replace(/([A-Z])/g, '-$1').toLowerCase()}`
          body.style.setProperty(cssVarName, item[property])
        }
      }
    }

    watch(state, newVal => {
      appStore.changeState({
        name: 'theme',
        value: {
          style: newVal.style,
          primaryColor: newVal.primaryColor,
          primaryTextColor: newVal.primaryTextColor,
        },
      })
      setTheme()
    })

    const drawer = ref(false)
    const options = reactive([
      { name: '显示logo', value: appStore.showLogo, store: 'showLogo' },
      { name: '显示面包屑导航', value: appStore.showTabs, store: 'showTabs' },
      {
        name: '保持一个菜单展开',
        value: appStore.expandOneMenu,
        store: 'expandOneMenu',
      },
    ])

    const drawerChange = value => {
      drawer.value = value
    }

    const change = option => {
      appStore.changeState({ name: option.store, value: option.value })
    }

    setTheme()

    return {
      drawer,
      options,
      state,
      themeColorArr,
      drawerChange,
      change,
    }
  },
})
</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  &:focus {
    outline: none;
  }
}

.list {
  padding: 0 20px;
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    span {
      font-size: 16px;
    }
  }
}
h3 {
  margin-top: 40px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  padding: 0 20px;
  &:first-child {
    margin-top: 0;
  }
}
.theme-box {
  text-align: left;
  padding-left: 20px;
}
</style>
