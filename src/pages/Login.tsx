import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, Loader2 } from 'lucide-react'
import igIcon from '@/assets/instagram.svg'
import fbIcon from '@/assets/facebook.svg'
import lineIcon from '@/assets/line.svg'
import { toast } from 'sonner'
import { login } from '@/api/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = email && password

  // 防止連續點擊
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await login({
        email,
        password,
      })
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      toast.success('登入成功')
      console.log('Login success:', response)

      setTimeout(() => navigate('/home'), 1000)
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
        }
        toast.error(errorMessages[errorData.key] || '輸入欄位有誤')
      } else if (status === 401 && errorData?.key) {
        const errorMessages: Record<string, string> = {
          email: '此信箱尚為驗證',
          password: '帳號或密碼錯誤',
        }
        toast.error(errorMessages[errorData.key] || '登入失敗')
      } else if (status >= 500) {
        toast.error('伺服器維護中，請稍後再試')
      } else {
        toast.error(errorData?.message || '登入失敗，請檢查網路連線')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start p-6 pt-16">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-orange-300 via-amber-100 to-white opacity-60" />

      <div className="z-10 my-16 flex items-center justify-center gap-3 pr-2 drop-shadow-sm md:my-24">
        <img src="/icon.png" alt="icon" className="h-12 w-12 object-contain" />
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tighter text-amber-600">
            NTNU <span className="text-amber-700">CDC</span>
          </h1>
        </div>
      </div>

      <div className="z-10 flex w-full max-w-md flex-col gap-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="電子郵件"
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                  placeholder="密碼"
                  required
                />
              </div>
              <div className="flex items-center">
                <a
                  href="#"
                  className="ml-auto inline-block text-xs text-amber-700 underline-offset-4 hover:text-amber-600 hover:underline"
                >
                  忘記密碼?
                </a>
              </div>
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
              '登入'
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
          <p>尚未有帳號?</p>
          <Link
            to="/register"
            className="font-bold text-amber-700 underline-offset-4 hover:text-amber-600 hover:underline"
          >
            註冊
          </Link>
        </div>
        <div className="mt-20 flex items-center justify-center gap-10">
          {[
            {
              img: igIcon,
              href: 'https://www.instagram.com/ntnu_cdc/',
            },
            { img: fbIcon, href: 'https://www.facebook.com/ntnucdc' },
            { img: lineIcon, href: 'https://line.me/ti/g/Je-EQwbtn3' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              className="opacity-80 transition-all hover:scale-110 hover:opacity-100 active:scale-90"
            >
              <img
                src={social.img}
                alt="social"
                className="h-10 w-10 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
