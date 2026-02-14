import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMyRecords, type Record } from '@/api/record'
import { toast } from 'sonner'

export default function Record() {
  const [isLoading, setIsLoading] = useState(false)
  const [myRecords, setMyRecords] = useState<Record[]>([])
  useEffect(() => {
    async function fetchMyRecords() {
      try {
        setIsLoading(true)
        const data = await getMyRecords()
        setMyRecords(data.my_records)
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
        toast.error(errorData?.message || '獲取個人紀錄失敗')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyRecords()
  }, [])
  return (
    <Table className="boder-slate-600 mx-auto max-w-[500px] rounded-lg border-2">
      <TableHeader className="border-slate-300 bg-slate-100 font-bold">
        <TableRow>
          <TableHead>活動名稱</TableHead>
          <TableHead>日期</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <TableBody>
          <TableRow>
            <TableCell className="h-24 text-center text-slate-500">
              讀取中...
            </TableCell>
          </TableRow>
        </TableBody>
      ) : myRecords.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={2}
            className="h-32 text-center text-slate-500"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <p>目前沒有任何參加紀錄</p>
            </div>
          </TableCell>
        </TableRow>
      ) : (
        <TableBody>
          {myRecords.map((record, index) => {
            return (
              <TableRow
                key={index}
                className="cursor-pointer transition-colors hover:bg-slate-50"
              >
                <TableCell className="font-medium">
                  {record.activity_name}
                </TableCell>
                <TableCell>{record.date}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      )}
    </Table>
  )
}
