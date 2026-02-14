import api from '@/api/index'

export type UserRole = 'CDC_MEMBER' | 'NON_CDC_MEMBER'

export interface RegisterUserSchema {
  email: string
  username: string
  password: string
  role: UserRole
}

function registerUser(user: RegisterUserSchema) {
  return api.post('/user/register', user)
}

export { registerUser }
