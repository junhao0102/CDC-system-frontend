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
import Pagination from '@/components/Pagination'
import { toast } from 'sonner'

export default function Record() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [myRecords, setMyRecords] = useState<Record[]>([])
  useEffect(() => {
    async function fetchMyRecords() {
      try {
        setIsLoading(true)
        const data = await getMyRecords(currentPage)
        setMyRecords(data.rows)
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
        toast.error(errorData?.message || '獲取個人紀錄失敗')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyRecords()
  }, [currentPage])
  return (
    <div className="mx-auto w-full max-w-[600px] space-y-4 p-4">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>活動名稱</TableHead>
              <TableHead>日期</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-slate-500"
                >
                  讀取中...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : myRecords.length === 0 ? (
            <TableBody>
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
            </TableBody>
          ) : (
            <TableBody>
              {myRecords.map((record, index) => {
                return (
                  <TableRow key={index} className="transition-colors">
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
      </div>
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
