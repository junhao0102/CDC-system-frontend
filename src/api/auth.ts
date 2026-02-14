import api from '@/api/index'

export interface loginSchema {
  email: string
  password: string
}

export interface User {
  username: string
  email: string
}
interface meSchema {
  user: User
}
function login(user: loginSchema) {
  return api.post('/auth/login', user)
}

function me(): Promise<meSchema> {
  return api.get('/auth/me')
}

export { login, me }
