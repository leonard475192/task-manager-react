import React from "react"

import { Grid } from "@mui/material"

import { TaskRes, TaskStatus } from "interfaces"
import { TaskItem } from "./TaskItem"

type Props = {
  title: TaskStatus
  tasks: TaskRes[]
  setTasks: Function
}

export const TaskList: React.FC<Props> = ({ title, tasks, setTasks }) => {
  return (
    <Grid item xs={4}>
      <h2>{ title }</h2>
      <ul>
      {
          tasks.map((task: TaskRes, index: number) => {
            return (
              <TaskItem
                key={index}
                task={task}
                setTasks={setTasks}
              />
            )
          })
        }
      </ul>
    </Grid>
  )
}
