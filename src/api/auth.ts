import api from '@/api/index'

export interface loginSchema {
  email: string
  password: string
}

function login(user: loginSchema) {
  return api.post('/auth/login', user)
}

export { login }
