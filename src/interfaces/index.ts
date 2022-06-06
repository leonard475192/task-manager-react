export const taskStatuses = {
  TODO: "未完了",
  DOING: "実行中",
  DONE: "完了",
} as const
export type TaskStatus = keyof typeof taskStatuses

export type TaskReq = {
  title: string
  status: TaskStatus
  content: string | undefined  // TODO string?でできなかった
  manHour: number | undefined
  deadlineAt: Date | undefined
}

export type TaskRes = {
  id: number
  title: string
  status: TaskStatus
  content: string | undefined
  manHour: number | undefined
  deadlineAt: Date | undefined
  createdAt: Date
  updateAt: Date
}
