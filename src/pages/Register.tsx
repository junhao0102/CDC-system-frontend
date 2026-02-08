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
import { Mail, Lock, User, IdCard } from 'lucide-react'
import { registerUser, type UserRole } from '@/api/user'

export default function Register() {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole | ''>('')

  // 防止連續點擊
  const [isLoading, setIsLoading] = useState(false)

  const isSamePassword = password === confirmPassword && password !== ''
  const isNotEmpty = confirmPassword !== ''

  const navigate = useNavigate()
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!username || !email || !password || !role) {
        toast.error('You need to fill in every field')
        return
      }
      const response = await registerUser({
        username,
        email: email.trim(),
        password,
        role,
      })
      toast.success(
        `Registration successful! Please check your inbox to verify your email`,
      )
      setTimeout(() => navigate('/login'), 2000)
      console.log('res:', response)
    } catch (e: any) {
      console.error('Register user error: ', e.response.data.message)
      const { message } = e.response.data
      switch (e.response?.status) {
        case 400:
          toast.error(message)
          break
        case 409:
          toast.error(message)
          break
        case 500:
          toast.error(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start p-6 pt-16">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-orange-300 via-amber-100 to-white opacity-60" />
      <div className="z-10 my-16 flex items-center justify-center gap-3 pr-2 drop-shadow-sm md:my-24">
        <h1 className="text-center text-3xl font-black tracking-tighter text-amber-700">
          Sign Up
        </h1>
      </div>
      <div className="z-10 flex w-full max-w-md flex-col gap-3">
        <form onSubmit={submit} noValidate>
          <div className="flex flex-col gap-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter Your Name"
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                placeholder="Password"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500"
                placeholder="Confirm Password"
              />
              {isNotEmpty && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isSamePassword ? '✅' : '❌'}
                </span>
              )}
            </div>

            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600" />
              <Select
                value={role}
                onValueChange={(value: UserRole) => setRole(value)}
              >
                <SelectTrigger className="h-12 border-2 border-stone-400 pl-10 transition-all focus-visible:border-amber-500 focus-visible:ring-amber-500">
                  <SelectValue placeholder="Select If You Are The Member In CDC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="cdc_member">⭕ CDC Member</SelectItem>
                    <SelectItem value="non_cdc_member">
                      ❌ non CDC Member
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            type="submit"
            className="ml-8 mt-4 h-12 w-full max-w-[300px] rounded-md border-2 border-amber-900/50 bg-amber-300 font-bold text-amber-950 transition-all hover:scale-105 hover:bg-amber-300 md:ml-16"
            disabled={
              !isSamePassword || !username || !email || !password || !role
            }
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  )
}
