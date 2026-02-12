import { Link } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { CircleUserRound, LogOut } from 'lucide-react'
import menus from '@/constants/menu'

export function AppSidebar() {
  const footer = {
    name: 'Jim',
    email: 'example@example.com',
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="icon" className="h-8 w-8 object-contain" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-600">
            NTNU CDC
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menus.map((menu) => (
              <SidebarMenuItem key={menu.name} className="px-2">
                <SidebarMenuButton size="lg" asChild>
                  <Link to={menu.url} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center">
                      <menu.icon className="h-5 w-5 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {menu.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="default" asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogOut />
                <span className="text-sm font-medium text-slate-600">登出</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="border-t border-slate-300 pt-2">
            <SidebarMenuButton size="lg">
              <div className="flex h-8 w-8 items-center justify-center">
                <CircleUserRound className="h-5 w-5 text-slate-500" />
              </div>
              <div className="ml-1 flex flex-col text-left text-sm leading-tight">
                <span className="font-semibold text-slate-700">
                  {footer.name}
                </span>
                <span className="text-xs text-slate-500">{footer.email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
