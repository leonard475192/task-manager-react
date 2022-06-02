import React, { useEffect, useState } from "react"

import { fetchTasks } from "lib/api/tasks"
import { TaskRes } from "interfaces"

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

  const listItems = tasks.map((task) =>
    <li key={task.id}>{task.title}</li>
  );

  return (
    <ul>{listItems}</ul>
  )
}

export default App
