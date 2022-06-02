export type TaskStatus = "TODO" | "DOING" | "DONE"

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
