import React, { useEffect, useState } from "react"

import { fetchTasks } from "lib/api/tasks"
import { TaskRes } from "interfaces"

import { TaskBoard } from "components/TaskBoard"

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskRes[]>([])

  const handleTasks = async () => {
    try {
      const res = await fetchTasks()

      if (res.status === 200) {
        setTasks(res.data)
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleTasks()
  }, [])

  return (
    <TaskBoard 
      tasks={tasks}
      setTasks={setTasks}
    />
  )
}

export default App
