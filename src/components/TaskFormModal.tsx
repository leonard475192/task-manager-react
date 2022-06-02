import { FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import React, { useState } from "react"

import { TaskStatus, TaskReq, TaskRes } from "../interfaces/index"
import { createTask } from "../lib/api/tasks"


interface TaskFormProps {
  tasks: TaskRes[]
  setTasks: Function
}

export const TaskFormModal: React.FC<TaskFormProps> = ({ tasks, setTasks }) => {
  const INIT_VALUE: TaskReq = {
    title: "",
    status: "TODO",
    content: "",
    manHour: 1,
    deadlineAt: new Date(),
  }

  const [formValue, setForm] = useState<TaskReq>(INIT_VALUE)

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: TaskReq = {
      title: formValue.title,
      status: formValue.status,
      content: formValue.content,
      manHour: formValue.manHour,
      deadlineAt: formValue.deadlineAt,
    }

    try {
      const res = await createTask(data)

      if (res.status === 200) {
        setTasks([...tasks, res.data])
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }

    setForm(INIT_VALUE)
  }

  return (
    <form onSubmit={handleCreateTask}>
      <Input
        type="text"
        value={formValue.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({...formValue, title: e.target.value})
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValue.status}
          label="ステータス"
          onChange={(e: SelectChangeEvent) => {
            if (typeof e.target.value === TaskStatus) {
              setForm({...formValue, status: e.target.value})
            } else {
              return
            }
          }}
        >
          <MenuItem value={"TODO"}>未完了</MenuItem>
          <MenuItem value={"DOING"}>実行中</MenuItem>
          <MenuItem value={"DONE"}>完了</MenuItem>
        </Select>
      </FormControl>
      <Input
        type="text"
        value={formValue.content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({...formValue, content: e.target.value})
        }}
      />
      <input type="submit" value="Add" disabled={!title} />
    </form>
  )
}
