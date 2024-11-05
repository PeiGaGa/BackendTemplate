import axios from 'axios'
import { useUserStore } from '@/stores/modules/user' // 引入 Pinia store
import { ElMessage } from 'element-plus'

const baseURL = import.meta.env.VITE_BASE_URL

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// 请求前的统一处理
service.interceptors.request.use(
  config => {
    const userStore = useUserStore() // 使用 Pinia store
    // JWT 鉴权处理
    const token = userStore.token // 获取 token
    if (token) {
      config.headers['token'] = token // 设置请求头
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      showError(res)
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error) // for debug
    const badMessage = error.message || error
    const code = parseInt(
      badMessage
        .toString()
        .replace('Error: Request failed with status code ', ''),
    )
    showError({ code, message: badMessage })
    return Promise.reject(error)
  },
)

// 错误处理
function showError(error) {
  const userStore = useUserStore() // 使用 Pinia store
  // token 过期，清除本地数据，并跳转至登录页面
  if (error.code === 403) {
    // to re-login
    userStore.loginOut() // 直接调用 Pinia 的方法
  } else {
    ElMessage({
      message: error.msg || error.message || '服务异常',
      type: 'error',
      duration: 3 * 1000,
    })
  }
}

export default service
