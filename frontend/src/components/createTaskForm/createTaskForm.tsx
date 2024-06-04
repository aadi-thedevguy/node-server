import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
  useContext,
} from "react";
import { useMutation } from "@tanstack/react-query";

import { TaskDateField } from "./_taskDateField";
import { TaskDescriptionField } from "./_taskDescriptionField";
import { TaskSelectField } from "./_taskSelectField";
import { TaskTitleField } from "./_taskTitleField";
import { Status } from "./enums/status";
import { Priority } from "./enums/priority";
import { ICreateTask } from "../taskArea/interfaces";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { AppContext } from "../../context/AppContext";
import { ISideBar } from "../sidebar/interfaces";

const CreateTaskForm: FC<ISideBar> = (props): ReactElement => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { setOpen } = props;
  const ctx = useContext(AppContext);

  const { isLoading, mutate, isSuccess } = useMutation((data: ICreateTask) =>
    sendApiRequest("/api/tasks", "POST", ctx.user, data)
  );

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      ctx.toggle();
      if (setOpen) {
        setOpen(false);
      }
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [isSuccess]);

  function createTaskHandler() {
    if (!title || !date || !description) return;

    const task = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };

    mutate(task);

    setTitle("");
    setDescription("");
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: "100%", marginBottom: "1rem" }}>
          <AlertTitle>Success</AlertTitle>
          The Task has been created successfully
        </Alert>
      )}
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>

      <Stack sx={{ width: "100%" }} spacing={2}>
        <TaskTitleField
          disabled={isLoading}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TaskDescriptionField
          disabled={isLoading}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDateField
          disabled={isLoading}
          value={date}
          onChange={(date) => setDate(date)}
        />

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            disabled={isLoading}
            onChange={(e) => setStatus(e.target.value as string)}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
              {
                value: Status.completed,
                label: Status.completed.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            disabled={isLoading}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              {
                value: Priority.low,
                label: Priority.low,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.high,
                label: Priority.high,
              },
            ]}
          />
        </Stack>
        {isLoading && <LinearProgress />}
        <Button
          disabled={!title || !description || !date || !status || !priority}
          onClick={createTaskHandler}
          variant="contained"
          fullWidth
          size="large"
        >
          Create a Task
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
