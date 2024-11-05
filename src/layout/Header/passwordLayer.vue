<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      style="margin-right: 30px"
    >
      <el-form-item label="用户名：" prop="name"> 管理员 </el-form-item>
      <el-form-item label="原密码：" prop="old">
        <el-input
          v-model="form.old"
          placeholder="请输入原密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="new">
        <el-input
          v-model="form.new"
          placeholder="请输入新密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user' // 引入 Pinia store
import Layer from '@/components/layer/index.vue'

export default defineComponent({
  components: {
    Layer,
  },
  props: {
    layer: {
      type: Object,
      default: () => ({
        show: false,
        title: '',
        showButton: true,
      }),
    },
  },
  setup(props) {
    const ruleForm = ref(null)
    const layerDom = ref(null)
    const userStore = useUserStore() // 使用 Pinia store
    const form = ref({
      userId: '123465', // 假设用户ID
      name: '',
      old: '',
      new: '',
    })

    const rules = {
      old: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
      new: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    }

    async function submit() {
      if (ruleForm.value) {
        ruleForm.value.validate(async valid => {
          if (valid) {
            const params = {
              id: form.value.userId,
              old: form.value.old,
              new: form.value.new,
            }

            try {
              await userStore.passwordChange(params) // 调用 Pinia store 的密码修改方法
              ElMessage({
                type: 'success',
                message: '密码修改成功，即将跳转到登录页面',
              })
              layerDom.value && layerDom.value.close()
              setTimeout(() => {
                userStore.loginOut() // 调用登出方法
              }, 2000)
            } catch (error) {
              ElMessage.error('密码修改失败，请重试')
              console.error(error)
            }
          } else {
            return false
          }
        })
      }
    }

    return {
      form,
      rules,
      layerDom,
      ruleForm,
      submit,
    }
  },
})
</script>

<style lang="scss" scoped></style>
