import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Mail, Lock, User, IdCard, Loader2 } from 'lucide-react'
import { registerUser, type UserRole } from '@/api/user'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
  })

  const { username, email, password, confirmPassword, role } = formData

  // 防止連續點擊
  const [isLoading, setIsLoading] = useState(false)

  const isPasswordMatch = password === confirmPassword && password !== ''
  const canSubmit =
    username && email && password && role && isPasswordMatch && !isLoading

  function handleChange(key: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isPasswordMatch) {
      toast.error('兩次密碼輸入不一致')
      return
    }
    setIsLoading(true)
    try {
      const response = await registerUser({
        username,
        email: email.trim(),
        password,
        role: role as UserRole,
      })

      toast.success('註冊成功！請至信箱收取驗證信')
      console.log('Registration success:', response)

      setTimeout(() => navigate('/login'), 2000)
    } catch (e: any) {
      const status = e.response?.status
      const errorData = e.response?.data

      if (!errorData) {
        console.error('Login error: Network Error')
        toast.error('伺服器無法連線，請稍後再試。')
        return
      }

      if (status === 400 && errorData?.key) {
        const errorMessages: Record<string, string> = {
          email: '電子郵件格式錯誤',
          password: '密碼格式錯誤',
          username: '使用者名稱格式錯誤',
          role: '角色權限錯誤',
        }
        toast.error(errorMessages[errorData.key] || '輸入欄位有誤')
      } else if (status === 409) {
        toast.error('此電子信箱已被註冊')
      } else if (status >= 500) {
        toast.error('伺服器維護中，請稍後再試')
      } else {
        toast.error(errorData?.message || '註冊失敗，請檢查網路連線')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start p-6 pt-16">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-50 to-orange-100">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(217,119,6,0.3) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>
      <div className="z-10 my-16 flex items-center justify-center gap-3 pr-2 drop-shadow-sm md:my-24">
        <h1 className="text-center text-3xl font-black tracking-tighter text-amber-700">
          註冊
        </h1>
      </div>
      <div className="z-10 flex w-full max-w-md flex-col gap-3">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="text"
                value={username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="使用者姓名"
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="email"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="電子郵件"
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="password"
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                placeholder="密碼"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  handleChange('confirmPassword', e.target.value)
                }
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                placeholder="確認密碼"
                required
              />
              {confirmPassword && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isPasswordMatch ? '✅' : '❌'}
                </span>
              )}
            </div>

            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Select
                value={role}
                onValueChange={(value: UserRole) => handleChange('role', value)}
                required
              >
                <SelectTrigger className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500">
                  <SelectValue placeholder="是否為崇德社社員" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="CDC_MEMBER">⭕</SelectItem>
                    <SelectItem value="NON_CDC_MEMBER">❌</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            type="submit"
            className="ml-8 mt-4 h-12 w-full max-w-[300px] rounded-md border-2 border-amber-900/50 bg-amber-300 font-bold text-amber-950 transition-all hover:scale-105 hover:bg-amber-300 md:ml-16"
            disabled={!canSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              '創建使用者'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
