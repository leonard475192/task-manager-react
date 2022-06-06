import React from "react"

import { Button, Card } from "@mui/material"

import { TaskRes } from "interfaces"
import { deleteTask } from "lib/api/tasks"


type Props = {
  task: TaskRes
  setShowModal: Function
}

export const TaskItem: React.FC<Props> = ({ task, setShowModal }) => {
  const handleDeleteTask = async (id: number) => {
    try {
      const res = await deleteTask(id)
      console.log(res)

      if (res?.status === 204) {
        // setTasks((prev: TaskRes[]) => prev.filter((task: TaskRes) => task.id !== id))
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <li>
      <Card className="my-3 px-3">
        <span>{task.title}</span>
        <span>
          <Button variant="text" onClick={() => setShowModal(task.id || 0)}>Delete</Button>
        </span>
      </Card>
    </li>
  )
}
