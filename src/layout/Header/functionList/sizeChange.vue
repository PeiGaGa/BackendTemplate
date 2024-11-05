<template>
  <el-dropdown @command="handleCommand" size="medium">
    <span class="el-dropdown-link">
      <i class="sfont system-zuixiaohua"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="d in list"
          :key="d.size"
          :command="d.size"
          :disabled="elementSize === d.size"
        >
          {{ d.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="js">
import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/stores/modules/app' // 引入 Pinia store

export default defineComponent({
  setup() {
    const appStore = useAppStore() // 使用 Pinia store
    const elementSize = computed(() => appStore.elementSize) // 访问 Pinia store 中的 elementSize

    const list = [
      { size: 'large', name: '大' },
      { size: 'default', name: '默认' },
      { size: 'small', name: '小' },
    ]

    const handleCommand = command => {
      appStore.setElementSize(command) // 使用 Pinia store 的方法更新 elementSize
    }

    return {
      list,
      elementSize,
      handleCommand,
    }
  },
})
</script>

<style lang="scss" scoped></style>
