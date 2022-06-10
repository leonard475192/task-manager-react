import React from "react"

import { Grid, Paper } from "@mui/material"

import { TaskRes, TaskStatus } from "interfaces"
import { TaskItem } from "./TaskItem"

type Props = {
  title: TaskStatus
  tasks: TaskRes[]
  setShowModal: Function
  setSelectTask: Function
}

export const TaskList: React.FC<Props> = ({ title, tasks, setShowModal, setSelectTask }) => {
  return (
    <Grid item xs={4}>
      <Paper elevation={3} className="p-6">
        <h2 className="text-2xl mb-6">{ title }</h2>
        <ul>
        {
            tasks.map((task: TaskRes, index: number) => {
              return (
                <TaskItem
                  key={index}
                  task={task}
                  setShowModal={setShowModal}
                  setSelectTask={setSelectTask}
                />
              )
            })
          }
        </ul>
      </Paper>
    </Grid>
  )
}
