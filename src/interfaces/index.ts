export const taskStatuses = ["TODO", "DOING", "DONE"] as const
export type TaskStatus = typeof taskStatuses[number]

export type TaskReq = {
  title: string
  status: TaskStatus
  content: string
  manHour: number
  deadlineAt: Date
}

export type TaskRes = {
  id: number
  title: string
  status: TaskStatus
  content: string
  manHour: number
  deadlineAt: Date
  createdAt: Date
  updateAt: Date
}
