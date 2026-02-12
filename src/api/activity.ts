import api from '@/api/index'

export interface addActivitySchema {
  activity_name: string
  date: string
  start_time: string
  end_time: string
}

function addActivity(activity: addActivitySchema) {
  return api.post('/activity', activity)
}

export { addActivity }
