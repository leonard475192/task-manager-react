import { TaskReq } from "interfaces"
import client from "lib/api/client"

export const fetchTasks = () => {
  return client.get("tasks")
}

export const createTask = (data: TaskReq) => {
  return client.post("tasks", data)
}

export const updateTask = (id: number | undefined, data: TaskReq) => {
  return client.patch(`user/${id}`, data)
}

export const deleteTask = (id: number | undefined) => {
  return client.delete(`user/${id}`)
}