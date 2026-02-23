import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { todayActivity, type Activity } from '@/api/activity'
import { toast } from 'sonner'
import { CalendarDays, QrCode, Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

export default function TodayActivity() {
  const domain = import.meta.env.VITE_DOMAIN
  const [isLoading, setIsLoading] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    async function fetchTodayActivities() {
      try {
        setIsLoading(true)
        const data = await todayActivity()
        setActivities(data.activities)
      } catch (e: any) {
        toast.error('獲取活動失敗')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTodayActivities()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm font-medium">正在準備今日活動...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="hidden rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 sm:block">
          {new Date().toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {activities.length === 0 ? (
        <Card className="border-dashed py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-3">
              <CalendarDays className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-600">
              今天沒有任何活動
            </p>
            <p className="text-sm text-slate-400">
              當前時段暫無安排，請稍後再試
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="bg-slate-50/50 pb-4">
                <CardTitle className="text-xl font-bold text-slate-800">
                  {activity.activity_name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  {activity.start_time} - {activity.end_time}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="relative rounded-xl border-4 border-slate-50 bg-white p-4 shadow-sm">
                  <QRCodeSVG
                    value={`${domain}/scan/${activity.qr_code}`}
                    size={200}
                    level="H"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-white/10 opacity-0 transition-opacity hover:opacity-100">
                    <QrCode className="h-10 w-10 text-slate-200" />
                  </div>
                </div>
                <div className="mt-4 w-full text-center">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">
                    Scan to Sign-in
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
