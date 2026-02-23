import { useState, useEffect, Fragment } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AddActivity from '@/components/activity/AddActivity'
import { getActivities, type Activity } from '@/api/activity'
import Pagination from '@/components/Pagination'
import { toast } from 'sonner'

export default function Activity() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    async function fetchActivities() {
      try {
        setIsLoading(true)
        const data = await getActivities(currentPage)
        setActivities(data.rows)
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
        toast.error(errorData?.message || '獲取活動失敗')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [currentPage])

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
            {activities.map((activity) => {
              return (
                <Fragment key={activity.id}>
                  <TableRow className="transition-colors">
                    <TableCell className="font-medium">
                      {activity.activity_name}
                    </TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.start_time}</TableCell>
                    <TableCell>{activity.end_time}</TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
          </TableBody>
        )}
      </Table>
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
