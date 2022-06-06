import React, { useEffect, useState } from "react"

import { Container } from "@mui/system"

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
    <Container fixed maxWidth="lg">
      <h1 className="text-4xl my-12">Task Board</h1>
      <TaskBoard 
      tasks={tasks}
      setTasks={setTasks}
    />
    </Container>
  )
}

export default App
