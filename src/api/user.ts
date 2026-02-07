import api from '@/api/index'

export type UserRole = 'cdc_member' | 'non_cdc_member'

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
