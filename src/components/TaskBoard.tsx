import React from "react"

import { Grid } from "@mui/material"

import { taskStatuses, TaskRes, TaskStatus } from "interfaces"
import { TaskList } from "./TaskList"

type Props = {
  tasks: TaskRes[]
  setShowModal: Function
  setSelectTask: Function
}

export const TaskBoard: React.FC<Props> = ({ tasks, setShowModal, setSelectTask }) => {
  return (
    <Grid container spacing={2}>
      {
        (Object.keys(taskStatuses) as TaskStatus[]).map((taskStatus: TaskStatus, index: number) => {
          return (
            <TaskList 
              key={index}
              title={taskStatus}
              tasks={tasks.filter(task => task.status === taskStatus)}
              setShowModal={setShowModal}
              setSelectTask={setSelectTask}
            />
          )
        })
      }
    </Grid>
  )
}
