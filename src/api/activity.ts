import api from '@/api/index'

interface addActivitySchema {
  activity_name: string
  date: string
  start_time: string
  end_time: string
}

interface addActivityResponseSchema {
  activity: Activity
}

interface signInResponseSchema {
  activity: Activity
}

export interface Activity {
  id: number
  activity_name: string
  date: string
  start_time: string
  end_time: string
  qr_code: string
  created_at: string
  updated_at: string
}

interface GetActivitiesResponseSchema {
  rows: Activity[]
  pagination: {
    page: number
    page_size: number
    total_pages: number
  }
}

function addActivity(
  activity: addActivitySchema,
): Promise<addActivityResponseSchema> {
  return api.post('/activity', activity)
}

function getActivities(page: number): Promise<GetActivitiesResponseSchema> {
  return api.get(`/activity/?page=${page}`)
}

function signIn(qr_code: string): Promise<signInResponseSchema> {
  return api.post(`/activity/sign_in/${qr_code}`)
}

export { addActivity, getActivities, signIn }
