import api from '@/api/index'

export interface loginSchema {
  email: string
  password: string
}

interface LoginResponseSchema {
  token: string
  user: {
    id: string
    username: string
    role: string
  }
}

function login(user: loginSchema): Promise<LoginResponseSchema> {
  return api.post('/auth/login', user)
}

export { login }
