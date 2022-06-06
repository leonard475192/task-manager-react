import React, { useEffect, useState } from "react"

import { Container } from "@mui/system"

import { fetchTasks } from "lib/api/tasks"
import { TaskRes } from "interfaces"
import { TaskBoard } from "components/TaskBoard"
import { TaskFormModal } from "components/TaskFormModal"
import { Button } from "@mui/material"

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskRes[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleClickShowModal = () => {
    setShowModal(true);
  };

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
      <div className="flex text-4xl my-12">
        <h1 className="flex-1">Task Board</h1>
        <Button onClick={handleClickShowModal} variant="contained" className="flex-none">新規作成</Button>
      </div>
      
      <TaskBoard 
        tasks={tasks}
        setShowModal={setShowModal}
      />
      <TaskFormModal
        isShow={showModal}
        setShow={setShowModal}
        tasks={tasks}
        setTasks={setTasks}
      />
    </Container>
  )
}

export default App
