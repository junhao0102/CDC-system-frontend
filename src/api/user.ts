import api from '@/api/index'
import { type UserRole } from '@/constants/role'

export interface User {
  id: number
  username: string
  role: UserRole
  is_verified: boolean
  created_at: string
  updated_at: string
  created_at_taipei_time: string
  updated_at_taipei_time: string
  updated_by: string
}

export interface RegisterUserSchema {
  email: string
  username: string
  password: string
  role: UserRole
}

interface GetAllUsersResponseSchema {
  rows: User[]
  pagination: {
    page: number
    page_size: number
    total_pages: number
  }
}

interface UpdateUserRoleResponseSchema {
  id: number
  role: UserRole
}

function registerUser(user: RegisterUserSchema) {
  return api.post('/user/register', user)
}

function GetAllUsers(page: number): Promise<GetAllUsersResponseSchema> {
  return api.get(`/user/users?page=${page}`)
}

function UpdateUserRole(
  id: number,
  role: UserRole,
): Promise<UpdateUserRoleResponseSchema> {
  return api.patch(`/user/role/${id}`, { role })
}

export { registerUser, GetAllUsers, UpdateUserRole }
