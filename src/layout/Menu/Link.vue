<template>
  <component :is="type" v-bind="linkProps(to)" @click="hideMenu">
    <slot></slot>
  </component>
</template>

<script lang="js">
import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/stores/modules/app' // 导入Pinia的store

export default defineComponent({
  name: 'appLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const appStore = useAppStore() // 使用Pinia store
    const isCollapse = computed(() => appStore.isCollapse) // 访问isCollapse状态

    const linkProps = to => {
      return {
        to: to,
      }
    }

    const hideMenu = () => {
      if (document.body.clientWidth <= 1000 && !isCollapse.value) {
        appStore.toggleCollapse() // 使用Pinia的动作来切换折叠状态
      }
    }

    return {
      type: 'router-link',
      linkProps,
      hideMenu,
    }
  },
})
</script>

<style lang=""></style>
