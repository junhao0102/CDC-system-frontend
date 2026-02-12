import { useState, Fragment } from 'react'
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

const events = [
  {
    activity_name: '114學年度 新生入學導引專題',
    date: '2026-02-12',
    start_time: '09:00',
    end_time: '12:00',
    qr_code: 'NTNU-ORI-2026',
  },
  {
    activity_name: '資訊工程系 職涯發展座談會',
    date: '2026-03-05',
    start_time: '14:00',
    end_time: '16:30',
    qr_code: 'CSI-CAREER-01',
  },
  {
    activity_name: '師大盃 程式競技大賽 (初賽)',
    date: '2026-03-20',
    start_time: '18:00',
    end_time: '21:00',
    qr_code: 'PROG-COMP-99',
  },
  {
    activity_name: '全校英語馬拉松 挑戰賽',
    date: '2026-04-10',
    start_time: '10:00',
    end_time: '17:00',
    qr_code: 'ENG-MARA-552',
  },
  {
    activity_name: 'CDC 數位發展中心 年度成果展',
    date: '2026-05-15',
    start_time: '13:30',
    end_time: '16:00',
    qr_code: 'CDC-ANN-2026',
  },
]

export default function Activity() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  function toggleRow(index: number) {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end pr-4">
        <AddActivity />
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
        <TableBody>
          {events.map((event, index) => {
            const isExpanded = expandedIndex === index
            return (
              <Fragment key={index}>
                <TableRow
                  className="cursor-pointer transition-colors hover:bg-slate-50"
                  onClick={() => toggleRow(index)}
                >
                  <TableCell className="font-medium">
                    {event.activity_name}
                  </TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.start_time}</TableCell>
                  <TableCell>{event.end_time}</TableCell>
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
                              value={`https://your-domain.com/scan/${event.qr_code}`}
                            />
                          </div>
                        </div>
                        <span className="rounded bg-slate-100 px-3 py-1 font-mono text-sm text-slate-600">
                          {event.qr_code}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
