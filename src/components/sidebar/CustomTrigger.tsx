import { cn } from "@/lib/utils"
import { SidebarTrigger,useSidebar } from '@/components/ui/sidebar'

export default function CustomTrigger() {
  const { isMobile } = useSidebar()

  return (
    <SidebarTrigger 
      className={cn(
        "transition-all",
        isMobile 
          ? "fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-2xl" 
          : "relative h-8 w-8 rounded-md border"
      )} 
    />
  )
}