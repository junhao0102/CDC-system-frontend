import { useState, useEffect, Fragment } from 'react'
import { cn } from '@/lib/utils'
import { QRCodeSVG } from 'qrcode.react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronDown } from 'lucide-react'
import AddActivity from '@/components/activity/AddActivity'
import { getActivities, type Activity } from '@/api/activity'
import { toast } from 'sonner'

export default function Activity() {
  const domain = import.meta.env.VITE_DOMAIN
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    async function fetchActivities() {
      try {
        setIsLoading(true)
        const data = await getActivities()
        setActivities(data.activities)
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
        toast.error(errorData?.message || '獲取活動失敗')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [])

  function toggleRow(index: number) {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end pr-4">
        <AddActivity setActivities={setActivities} />
      </div>
      <Table className="boder-slate-600 rounded-lg border-2">
        <TableHeader className="border-slate-300 bg-slate-100 font-bold">
          <TableRow>
            <TableHead>活動名稱</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>開始時間</TableHead>
            <TableHead>結束時間</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-slate-500"
              >
                讀取中...
              </TableCell>
            </TableRow>
          </TableBody>
        ) : activities.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-slate-500"
              >
                目前沒有任何活動
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {activities.map((activity, index) => {
              const isExpanded = expandedIndex === index
              return (
                <Fragment key={index}>
                  <TableRow
                    className="cursor-pointer transition-colors hover:bg-slate-50"
                    onClick={() => toggleRow(index)}
                  >
                    <TableCell className="font-medium">
                      {activity.activity_name}
                    </TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.start_time}</TableCell>
                    <TableCell>{activity.end_time}</TableCell>
                    <TableCell>
                      <ChevronDown
                        className={cn(
                          'inline-block h-5 w-5 transition-transform duration-200',
                          isExpanded && 'rotate-180',
                        )}
                      />
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow className="bg-slate-50/50 animate-in fade-in slide-in-from-top-1">
                      <TableCell colSpan={5} className="p-6">
                        <div className="flex flex-col items-center justify-center gap-4 py-4">
                          <div className="rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex h-32 w-32 items-center justify-center bg-slate-200 text-xs text-slate-500">
                              <QRCodeSVG
                                value={`${domain}/scan/${activity.qr_code}`}
                              />
                            </div>
                          </div>
                          <span className="rounded bg-slate-100 px-3 py-1 font-mono text-sm text-slate-600">
                            {activity.qr_code}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              )
            })}
          </TableBody>
        )}
      </Table>
    </div>
  )
}
