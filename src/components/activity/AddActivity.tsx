import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SquarePlus,
  CalendarIcon,
  ChevronDownIcon,
  Loader2,
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { addActivity, type Activity } from '@/api/activity'

function DatePicker({ name }: { name: string }) {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-col gap-2">
      <input
        type="hidden"
        name={name}
        value={date ? format(date, 'yyyy-MM-dd') : ''}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-between text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'yyyy-MM-dd') : <span>選擇日期</span>}
            </div>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default function AddActivity({
  setActivities,
}: {
  setActivities: Function
}) {
  // 防止連續點擊
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false) // Modal control

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const hasEmptyField = Object.values(data).some((value) => {
      if (typeof value === 'string') return value.trim() === ''
      return value === null || value === undefined
    })

    if (hasEmptyField) {
      toast.error('請填寫所有必填欄位')
      return
    }
    if (data.end_time <= data.start_time) {
      toast.error('結束時間必須大於開始時間')
      return
    }

    setIsLoading(true)

    try {
      const response = await addActivity({
        activity_name: data.activity_name.toString(),
        date: data.date.toString(),
        start_time: data.start_time.toString(),
        end_time: data.end_time.toString(),
      })
      toast.success('新增成功')
      console.log('Login success:', response)
      setOpen(false)
      setActivities((prev: Activity[]) => [...prev, response.activity])
    } catch (e: any) {
      const status = e.response?.status
      const errorData = e.response?.data

      if (!errorData) {
        console.error('Login error: Network Error')
        toast.error('伺服器無法連線，請稍後再試。')
        return
      }
      if (status === 401 || status === 403) return

      if (status === 400 && errorData?.key) {
        const errorMessages: Record<string, string> = {
          activity_name: '活動名稱格式錯誤',
          date: '日期格式錯誤',
          start_time: '開始時間格式錯誤',
          end_time: '結束時間格式錯誤',
        }
        toast.error(errorMessages[errorData.key] || '輸入欄位有誤')
      } else if (status >= 500) {
        toast.error('伺服器維護中，請稍後再試')
      } else {
        toast.error(errorData?.message || '登入失敗，請檢查網路連線')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SquarePlus className="mr-2 h-4 w-4" />
          新增活動
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="activity_name">活動名稱</Label>
              <Input
                id="activity_name"
                name="activity_name"
                placeholder="請輸入活動名稱"
                required
              />
            </Field>

            <Field>
              <Label>活動日期</Label>
              <DatePicker name="date" />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="activity_start_time">開始時間</Label>
                <Input
                  id="activity_start_time"
                  name="start_time"
                  type="time"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="activity_end_time">結束時間</Label>
                <Input
                  id="activity_end_time"
                  name="end_time"
                  type="time"
                  required
                />
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                取消
              </Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  新增中...
                </>
              ) : (
                '新增'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
