import api from '@/api/index'

interface MyRecords {
  rows: Record[]
  pagination: {
    page: number
    page_size: number
    total_pages: number
  }
}

export interface Record {
  id: number
  activity_name: string
  date: string
}

function getMyRecords(page: number): Promise<MyRecords> {
  return api.get(`/record/my_record?page=${page}`)
}

export { getMyRecords }
