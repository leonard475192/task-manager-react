import React, { useEffect, useState } from "react"

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { TaskStatus, TaskReq, TaskRes, taskStatuses } from "../interfaces/index"
import { createTask, deleteTask, updateTask } from "../lib/api/tasks"


interface TaskFormProps {
  isShow: boolean
  setShow: Function
  tasks: TaskRes[]
  setTasks: Function
  selectTask?: TaskRes
  setSelectTask: Function
}

export const TaskFormModal: React.FC<TaskFormProps> = ({ isShow, setShow, tasks, setTasks, selectTask, setSelectTask }) => {
  const INIT_VALUE: TaskReq = {
    title: "",
    status: "TODO",
    content: undefined,
    manHour: undefined, // ここの初期値をいれるとwarningがでなくなる
    deadlineAt: undefined, // 
  }

  const [formValue, setForm] = useState<TaskReq>({
    title:      INIT_VALUE.title,
    status:     INIT_VALUE.status,
    content:    INIT_VALUE.content,
    manHour:    INIT_VALUE.manHour,
    deadlineAt: INIT_VALUE.deadlineAt,
  })

  const [inputError, setInputError] = useState("")

  const resetForm = () => {
    setForm(INIT_VALUE)
    setInputError("")
  }

  // ジェネリクスをつかってもっと汎用的orReactFromHookを使う
  const required = (value: string) => {
    return value === ""
  }

  const handleCreateTask = async () => {
    if (required(formValue.title)) {
      setInputError("タイトルは必須項目です")
      return
    }
    const data: TaskReq = {
      title:      formValue.title,
      status:     formValue.status,
      content:    formValue.content,
      manHour:    formValue.manHour,
      deadlineAt: formValue.deadlineAt,
    }

    try {
      const res = await createTask(data)

      if (res.status === 201) {
        setTasks([...tasks, res.data])
        handleClose()
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }

    resetForm()
  }

  const handleUpdateTask = async (id: number) => {
    if (required(formValue.title)) {
      setInputError("タイトルは必須項目です")
      return
    }

    const data: TaskReq = {
      title:      formValue.title,
      status:     formValue.status,
      content:    formValue.content,
      manHour:    formValue.manHour,
      deadlineAt: formValue.deadlineAt,
    }

    try {
      const res = await updateTask(id, data)

      if (res.status === 200) {
        setTasks([...(tasks.filter((task: TaskRes) => task.id !== id)), res.data])
        handleClose()
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }

    resetForm()
  }

  const handleDeleteTask = async (id: number) => {
    try {
      const res = await deleteTask(id)

      if (res?.status === 204) {
        setTasks((prev: TaskRes[]) => prev.filter((task: TaskRes) => task.id !== id))
        handleClose()
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }

    resetForm()
  }

  useEffect(() => {
    setForm(selectTask ?? INIT_VALUE)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTask])

  const actionButton = (selectTask: TaskRes | undefined) => {
    if (selectTask) {
      return (
        <>
          <Button variant="outlined" onClick={() => handleDeleteTask(selectTask.id)}>削除</Button>
          <Button variant="contained" onClick={() => handleUpdateTask(selectTask.id)}>更新</Button>
        </>
      )
    } else {
      return <Button variant="contained" onClick={handleCreateTask}>新規作成</Button>
    }
  }

  const handleClose = () => {
    setShow(false)
    setSelectTask(undefined)
  }  

  return (
    <Dialog open={isShow} onClose={handleClose}>
      <div className="p-12">
        <DialogTitle>
          <TextField
            required
            label="タイトル"
            variant="standard"
            fullWidth
            value={formValue.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({...formValue, title: e.target.value})
            }}
            error={inputError !== ""}
            helperText={inputError}
          />
        </DialogTitle>
        <DialogContent className="py-12">
          <TextField
            required
            select
            label="ステータス"
            fullWidth
            variant="standard"
            value={formValue.status}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({...formValue, status: e.target.value as TaskStatus}) // TODO as 使いたくないなぁ
            }}
            SelectProps={{
              native: true,
            }}
          >
            {Object.entries(taskStatuses).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </TextField>
          <TextField
            type="number"
            label="工数(時間)"
            fullWidth
            variant="standard"
            sx={{ my: 2 }}
            value={formValue.manHour}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({...formValue, manHour: Number(e.target.value) })
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="締め切り"
              mask="____/__/__"
              inputFormat="yyyy/MM/dd"
              value={formValue.deadlineAt ?? null}
              onChange={(inputDate) => {
                setForm({...formValue, deadlineAt: inputDate ?? undefined})
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          
          <TextField
            label="詳細"
            multiline
            fullWidth
            variant="standard"
            sx={{ my: 2 }}
            minRows={10}
            value={formValue.content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({...formValue, content: e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          {actionButton(selectTask)}
        </DialogActions>
      </div>
    </Dialog>
  )
}
