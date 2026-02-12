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
  activities: Activity[]
}

function addActivity(
  activity: addActivitySchema,
): Promise<addActivityResponseSchema> {
  return api.post('/activity', activity)
}

function getActivities(): Promise<GetActivitiesResponseSchema> {
  return api.get('/activity')
}

export { addActivity, getActivities }
