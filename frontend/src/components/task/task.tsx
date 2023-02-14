import React, { FC, ReactElement } from 'react';

import { Box } from '@mui/material';
import { ITask } from './interfaces';
import { Priority } from '../createTaskForm/enums/priority';
import { Status } from '../createTaskForm/enums/status';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { TaskHeader } from './_taskHeader';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

export const Task: FC<ITask> = (props): ReactElement => {
  //  Destructure props
  const {
    id,
    title = 'Test Title',
    date = new Date(),
    description = 'Lorem ipsum dolor sit amet',
    priority = Priority.low,
    status = Status.completed,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;


  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
      id={id}
      status={status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
};

