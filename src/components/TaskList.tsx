import React from "react"

import { TaskRes } from "interfaces"
import { TaskItem } from "./TaskItem"

type ListProps = {
  title: string
  tasks: TaskRes[]
  setTasks: Function
}

export const TaskList: React.FC<ListProps> = ({ title, tasks, setTasks }) => {
  return (
    <>
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
    </>
  )
}
