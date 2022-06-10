import React, { useEffect } from "react"

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { TaskReq, TaskRes, taskStatuses } from "../interfaces/index"
import { createTask, deleteTask } from "../lib/api/tasks"
import { Controller, SubmitHandler, useForm } from "react-hook-form";


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

  const { control, handleSubmit, setValue } = useForm<TaskReq>({
    defaultValues: INIT_VALUE
  });

  const handleCreateTask: SubmitHandler<TaskReq> = async (data) => {
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
  }

  // const handleUpdateTask: SubmitHandler<{id: number, ...TaskReq}> = async (id: number, ...data) => {
  //   try {
  //     const res = await updateTask(id, data)

  //     if (res.status === 200) {
  //       setTasks([...(tasks.filter((task: TaskRes) => task.id !== id)), res.data])
  //       handleClose()
  //     } else {
  //       console.log(res.data)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
  }

  useEffect(() => {
    setValue("title", selectTask?.title ?? INIT_VALUE.title)
    setValue("status", selectTask?.status ?? INIT_VALUE.status)
    setValue("manHour", selectTask?.manHour ?? INIT_VALUE.manHour)
    setValue("deadlineAt", selectTask?.deadlineAt ?? INIT_VALUE.deadlineAt)
    setValue("content", selectTask?.content ?? INIT_VALUE.content)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTask])

  const actionButton = (selectTask: TaskRes | undefined) => {
    if (selectTask) {
      return (
        <>
          <Button variant="outlined" onClick={() => handleDeleteTask(selectTask.id)}>削除</Button>
          {/* <Button variant="contained" onClick={handleSubmit(handleUpdateTask(selectTask.id))}>更新</Button> */}
        </>
      )
    } else {
      return <Button variant="contained" onClick={handleSubmit(handleCreateTask)}>新規作成</Button>
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
          <Controller
            name="title"
            control={control}
            render={({ field }) => 
              <TextField
                required
                label="タイトル"
                variant="standard"
                fullWidth
                inputRef={field.ref}
                value={field.value}
                onChange={field.onChange}
              />
            }
          />
        </DialogTitle>
        <DialogContent className="py-12">
          <Controller
            name="status"
            control={control}
            render={({ field }) => 
              <TextField
                required
                select
                label="ステータス"
                fullWidth
                variant="standard"
                inputRef={field.ref}
                value={field.value}
                onChange={field.onChange}
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
            }
          />
          <Controller
            name="manHour"
            control={control}
            render={({ field }) => 
              <TextField
                type="number"
                label="工数(時間)"
                fullWidth
                variant="standard"
                sx={{ my: 2 }}
                inputRef={field.ref}
                value={field.value}
                onChange={field.onChange}
              />
            }
          />
          <Controller
            name="deadlineAt"
            control={control}
            render={({ field }) => 
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="締め切り"
                  mask="____/__/__"
                  inputFormat="yyyy/MM/dd"
                  inputRef={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            }
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => 
              <TextField
                label="詳細"
                multiline
                fullWidth
                variant="standard"
                sx={{ my: 2 }}
                minRows={10}
                inputRef={field.ref}
                value={field.value}
                onChange={field.onChange}
              />
            }
          />
        </DialogContent>
        <DialogActions>
          {actionButton(selectTask)}
        </DialogActions>
      </div>
    </Dialog>
  )
}
