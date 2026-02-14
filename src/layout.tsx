import { useLocation } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import CustomTrigger from './components/sidebar/CustomTrigger'
import { AppSidebar } from '@/components/sidebar/Sidebar'
import menus from '@/constants/menu'

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const currentMenu = menus.find((m) => m.url === location.pathname)

  return (
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
  )
}
