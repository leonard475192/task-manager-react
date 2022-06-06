import React from "react"

import { Grid } from "@mui/material"

import { taskStatuses, TaskRes, TaskStatus } from "interfaces"
import { TaskList } from "./TaskList"

type Props = {
  tasks: TaskRes[]
  setTasks: Function
}

export const TaskBoard: React.FC<Props> = ({ tasks, setTasks }) => {
  return (
    <Grid container spacing={2}>
      {
        taskStatuses.map((taskStatus: TaskStatus, index: number) => {
          return (
            <TaskList 
              key={index}
              title={taskStatus}
              tasks={tasks.filter(task => task.status === taskStatus)}
              setTasks={setTasks}
            />
          )
        })
      }
    </Grid>
  )
}
