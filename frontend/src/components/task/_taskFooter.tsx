import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { FC, ReactElement,useState } from 'react';

import { ITaskFooter } from './interfaces';
import { Status } from '../createTaskForm/enums/status';

export const TaskFooter: FC<ITaskFooter> = (
  props,
): ReactElement => {
  //  Destructure props
  const {
    id, status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;



  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
          defaultChecked={status === Status.inProgress }
          onChange={(e) => onStatusChange(e,id)}
          color="warning"
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: '#ffffff' }}
        onClick={(e) => onClick(e,id)}
      >
        Mark Complete
      </Button>
    </Box>
  );
};
