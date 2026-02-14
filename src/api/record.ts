import api from '@/api/index'

interface MyRecords {
  my_records: Record[]
}

export interface Record {
  id: number
  activity_name: string
  date: string
}

function getMyRecords(): Promise<MyRecords> {
  return api.get('/record/my_record')
}

export { getMyRecords }
