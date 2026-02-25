import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getRank, type Rank } from '@/api/activity'
import Pagination from '@/components/Pagination'
import { toast } from 'sonner'

export default function Rank() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [rankData, setRankData] = useState<Rank[]>([])

  const showPodium = currentPage === 1 && rankData.length > 0
  const topThree = showPodium ? [rankData[1], rankData[0], rankData[2]] : []
  const others = showPodium ? rankData.slice(3) : rankData

  useEffect(() => {
    async function fetchRank() {
      try {
        setIsLoading(true)
        const data = await getRank(currentPage)
        setRankData(data.rows)
        setTotalPages(data.pagination.total_pages)
      } catch (e: any) {
        toast.error('獲取排行榜失敗')
      } finally {
        setIsLoading(false)
      }
    }
    fetchRank()
  }, [currentPage])

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 p-6">
      {showPodium && (
        <div className="flex h-64 items-end justify-center gap-2 pb-4 pt-10">
          {topThree.map((user, idx) => {
            if (!user) return <div key={idx} className="w-24" />

            const isFirst = user.id === rankData[0]?.id
            const isSecond = user.id === rankData[1]?.id
            const isThird = user.id === rankData[2]?.id

            return (
              <div key={user.id} className="group flex flex-col items-center">
                <div className="mb-2 text-center">
                  <p className="text-sm font-bold">{user.username}</p>
                  <p className="text-xs text-slate-500">
                    {user.participates} pts
                  </p>
                </div>
                <div
                  className={`relative flex w-24 flex-col items-center justify-start rounded-t-lg pt-4 transition-all ${isFirst ? 'h-40 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]' : ''} ${isSecond ? 'h-32 bg-slate-300' : ''} ${isThird ? 'h-24 bg-orange-300' : ''}`}
                >
                  <span className="text-2xl font-black text-white/80">
                    {isFirst ? '1' : isSecond ? '2' : '3'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-20 text-center">排名</TableHead>
              <TableHead>參與者</TableHead>
              <TableHead className="pr-6 text-right">參與次數</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  讀取中...
                </TableCell>
              </TableRow>
            ) : others.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-slate-500"
                >
                  目前沒有更多排名
                </TableCell>
              </TableRow>
            ) : (
              others.map((user, index) => {
                const pageSize = 10
                const displayRank = showPodium
                  ? index + 4
                  : (currentPage - 1) * pageSize + index + 1

                return (
                  <TableRow key={user.id}>
                    <TableCell className="text-center font-semibold text-slate-500">
                      {displayRank}
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell className="pr-6 text-right tabular-nums">
                      {user.participates}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
