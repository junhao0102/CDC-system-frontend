import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { useLocation } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import CustomTrigger from './components/sidebar/CustomTrigger'
import { AppSidebar } from '@/components/sidebar/Sidebar'
import menus from '@/constants/menu'
import { me, type User } from '@/api/auth'
import { toast } from 'sonner'

export const UserContext = createContext<any>(null)

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getMe() {
      try {
        const data = await me()
        setUser(data.user)
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
        toast.error(errorData?.message || '獲取個人資訊失敗')
      } finally {
        setIsLoading(false)
      }
    }
    getMe()
  }, [])

  const currentMenu = menus.find((m) => m.url === location.pathname)

  return (
    <UserContext.Provider value={{ user ,isLoading}}>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex min-h-screen w-full flex-col">
          <header className="flex h-14 w-full items-center border-b px-4">
            <div className="flex items-center gap-2">
              <CustomTrigger />
              {currentMenu && (
                <currentMenu.icon className="h-5 w-5 text-slate-500" />
              )}
              <span>{currentMenu ? currentMenu.name : '系統'}</span>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </SidebarProvider>
    </UserContext.Provider>
  )
}
