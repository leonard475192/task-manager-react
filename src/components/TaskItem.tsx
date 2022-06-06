import React from "react"

import { Button, Card } from "@mui/material"

import { TaskRes } from "interfaces"


type Props = {
  task: TaskRes
  setShowModal: Function
  setSelectTask: Function
}

export const TaskItem: React.FC<Props> = ({ task, setShowModal, setSelectTask }) => {
  const openModal = () => {
    setSelectTask(task)
    setShowModal(true)
  }

  return (
    <li>
      <Card className="my-3 px-3 flex">
        <span className="flex-1 leading-8">{task.title}</span>
        <span className="flex-none">
          <Button variant="text" onClick={openModal}>OPEN</Button>
        </span>
      </Card>
    </li>
  )
}
