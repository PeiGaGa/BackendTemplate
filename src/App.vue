<template>
  <el-config-provider :size="size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="js">
import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/stores/modules/app' // 假设您的 Pinia store 路径为这个

export default defineComponent({
  name: 'App',
  setup() {
    // 使用 Pinia store
    const store = useAppStore()

    // 使用 computed 来访问 store 的状态
    const size = computed(() => store.elementSize)

    return {
      size,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
</style>
