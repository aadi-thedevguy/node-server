import { Box, Grid, Alert, LinearProgress } from "@mui/material";
import React, { FC, ReactElement,useContext,useEffect } from "react";
import { useQuery,useMutation } from "@tanstack/react-query";

import { Task } from "../task/task";
import { TaskCounter } from "../taskCounter/taskCounter";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { countTasks } from "./helpers/countTasks";
import { ITaskApi,IUpdateTask } from "./interfaces";
import { Status } from "../createTaskForm/enums/status";
import { AppContext } from "../../context/AppContext";

export const TaskArea: FC = (): ReactElement => {

  const ctx = useContext(AppContext)

  const url = `${window.location.origin}/api/tasks`
  const { error, isLoading, data,isRefetching, refetch } = useQuery(
    ["tasks"],
    async () => {

      if (ctx.user) {
        return await sendApiRequest<ITaskApi[]>(url, "GET",ctx.user)
      }
    }

  );

  useEffect(() => {
    refetch()
  },[ctx.updated])

  const updateTask = useMutation(async (data : IUpdateTask) => {

      return await sendApiRequest(url,'PUT',ctx.user,data)
  })

  useEffect(() => {
    if (updateTask.isSuccess) {
      ctx.toggle()
    }
  },[updateTask.isSuccess])

    const onStatusChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, id : string) => {
      ctx.toggle()

      updateTask.mutate({
        id, status : e.target.checked ? Status.inProgress : Status.todo
      })
    }

    const markCompleteHandler = (e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id : string) => {
      updateTask.mutate({
        id,
        status : Status.completed
      })
    } 

  return (
    <Grid item md={8} sm={12} px={4}>
      
        {(updateTask.isLoading || isRefetching) && <LinearProgress sx={{my : 4}} />} 
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
           <TaskCounter status={Status.todo} count={
            data ? countTasks(data, Status.todo) : undefined
           } />
            <TaskCounter status={Status.inProgress}  count={
            data ? countTasks(data, Status.inProgress) : undefined
           } />
            <TaskCounter status={Status.completed}  count={
            data ? countTasks(data, Status.completed) : undefined
           } />
         
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
        <>
            {error && (
              <Alert severity="error">There was an Error Fetching Tasks</Alert>
            )}
            {!error && Array.isArray(data) && data.length === 0 && (
              <Alert severity="warning">
                You do not have any Tasks, Start by creating some tasks
              </Alert>
            )}
            {
            isLoading ? <LinearProgress /> : 
              Array.isArray(data) && data.length > 0 && data.map((task,i) => {
                return task.status === Status.todo || task.status === Status.inProgress ? (
                <Task id={task._id} key={`${task._id} + ${i}`} priority={task.priority} title={task.title} description={task.description} status={task.status} 
                date={new Date(task.date)} onStatusChange={onStatusChangeHandler} onClick={markCompleteHandler} />
              ) : (false)
              }
                
            )}
           
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
