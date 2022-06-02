import React from "react"

import { Button } from "@mui/material"

import { TaskRes } from "interfaces"
import { deleteTask } from "lib/api/tasks"


type Props = {
  task: TaskRes
  setTasks: Function
}

export const TaskItem: React.FC<Props> = ({ task, setTasks }) => {
  const handleDeleteTask = async (id: number) => {
    try {
      const res = await deleteTask(id)
      console.log(res)

      if (res?.status === 200) {
        setTasks((prev: TaskRes[]) => prev.filter((task: TaskRes) => task.id !== id))
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <li>
      <span>{task.title}</span>
      <span>
        <Button variant="text" onClick={() => handleDeleteTask(task.id || 0)}>Delete</Button>
      </span>
    </li>
  )
}
