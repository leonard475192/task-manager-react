import { TaskReq, TaskRes } from "interfaces"
import client from "lib/api/client"

export const fetchTasks = () => {
  return client.get<TaskRes[]>("tasks")
}

export const createTask = (data: TaskReq) => {
  return client.post<TaskRes>("tasks", data)
}

export const updateTask = (id: number | undefined, data: TaskReq) => {
  return client.patch<TaskRes>(`user/${id}`, data)
}

export const deleteTask = (id: number | undefined) => {
  return client.delete(`user/${id}`)
}