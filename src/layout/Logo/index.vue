<template>
  <div class="logo-container">
    <h1 v-if="!isCollapse">{{ systemTitle }}</h1>
  </div>
</template>

<script lang="js">
import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/stores/modules/app' // 导入Pinia的store
import { systemTitle } from '@/config'

export default defineComponent({
  setup() {
    const appStore = useAppStore() // 使用Pinia store
    const isCollapse = computed(() => appStore.isCollapse) // 访问isCollapse状态

    return {
      isCollapse,
      systemTitle,
    }
  },
})
</script>

<style lang="scss" scoped>
.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--system-logo-background);
  h1 {
    font-size: 18px;
    white-space: nowrap;
    color: var(--system-logo-color);
  }
}
</style>
