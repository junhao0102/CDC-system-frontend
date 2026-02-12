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
import { SquarePlus, CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

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

export default function AddActivity() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const hasEmptyField = Object.values(data).some((value) => !value)

    if (hasEmptyField) {
      toast.error('請填寫所有必填欄位')
      return
    }
    if (data.end_time < data.start_time) {
      toast.error('結束時間必須大於開始時間')
      return
    }
    console.log('提交資料:', data)
  }

  return (
    <Dialog>
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
            <Button type="submit">新增</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
