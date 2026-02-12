import axios from 'axios'
import { toast } from 'sonner'

const api = axios.create({
  baseURL: '/api',
  timeout: 4000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (e) => {
    if (e.response) {
      const status = e.response.status
      if (status === 401) {
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      } else if (status === 403) {
        toast.error('你沒有權限執行此操作')
      }
    }
    return Promise.reject(e)
  },
)

export default api
