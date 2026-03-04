import { useState, useEffect, useContext } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GetAllUsers, type User, UpdateUserRole } from '@/api/user'
import Pagination from '@/components/Pagination'
import { toast } from 'sonner'
import { formatRelativeTime } from '@/utils/time_formatter'
import { ROLE_CONFIG, type UserRole } from '@/constants/role'
import { UserContext } from '@/layout'

function RoleBadge({ role }: { role: UserRole }) {
  const config = ROLE_CONFIG[role]
  return (
    <span className={`rounded-full px-2 py-1 text-xs ${config.className}`}>
      {config.label}
    </span>
  )
}
 

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const { user: currentUser } = useContext(UserContext)
 
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true)
        const data = await GetAllUsers(currentPage)
        setUsers(data.rows)
        setCurrentPage(data.pagination.page)
        setTotalPages(data.pagination.total_pages)
      } catch (e: any) {
        const status = e.response?.status
        const errorData = e.response?.data

        if (!e.response) {
          toast.error('伺服器無法連線，請檢查網路狀態')
          return
        }
        if (status >= 500) {
          toast.error('伺服器維護中，請稍後再試')
          return
        }
        toast.error(errorData?.message || '獲取使用者列表失敗')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage])

  async function handleUpdateRole(userId: number, role: UserRole) {
    try {
      setIsLoading(true)
      await UpdateUserRole(userId, role)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: role as UserRole,
                updated_at_taipei_time: new Date().toISOString(),
                updated_by: currentUser.username,
              }
            : user,
        ),
      )
      toast.success('使用者權限更新成功')
    } catch (e: any) {
      const status = e.response?.status
      const errorData = e.response?.data

      if (!e.response) {
        toast.error('伺服器無法連線，請檢查網路狀態')
        return
      }
      if (status >= 500) {
        toast.error('伺服器維護中，請稍後再試')
        return
      }
      toast.error(errorData?.message || '更新使用者權限失敗')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[800px] space-y-4 p-4">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>權限</TableHead>
              <TableHead>驗證狀態</TableHead>
              <TableHead>註冊時間</TableHead>
              <TableHead>上次更新時間</TableHead>
              <TableHead>操作</TableHead>
              <TableHead>上次更新者</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-slate-500"
                >
                  讀取中...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : users.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p>目前沒有任何使用者</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {users.map((user, index) => {
                return (
                  <TableRow
                    key={index}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <TableCell className="font-semibold text-slate-900">
                      {user.username}
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>
                    <TableCell
                      className={`text-sm text-slate-500 ${user.is_verified ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {user.is_verified ? '已驗證' : '未驗證'}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {formatRelativeTime(user.created_at_taipei_time)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {formatRelativeTime(user.updated_at_taipei_time)}
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={user.role}
                        onValueChange={(value) =>
                          handleUpdateRole(user.id, value as UserRole)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="請選擇權限" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="ADMIN">管理員</SelectItem>
                            <SelectItem value="CDC_MEMBER">社員</SelectItem>
                            <SelectItem value="NON_CDC_MEMBER">
                              非社員
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {user.updated_by || '未修改'}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </div>
  )
}
