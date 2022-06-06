import React from "react"

import { taskStatuses, TaskRes, TaskStatus } from "interfaces"
import { TaskList } from "./TaskList"

type Props = {
  tasks: TaskRes[]
  setTasks: Function
}

export const TaskBoard: React.FC<Props> = ({ tasks, setTasks }) => {
  return (
    <>
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
    </>
  )
}
