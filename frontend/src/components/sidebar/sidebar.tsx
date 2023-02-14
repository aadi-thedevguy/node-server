import React, { FC, ReactElement } from 'react';

import { CreateTaskForm } from '../createTaskForm/createTaskForm';
import { Grid } from '@mui/material';
import { Profile } from '../profile/profile';

export const Sidebar: FC = (): ReactElement => {
  return (
    <Grid
      item
      md={4}
      sx={{display : {
        sm : 'none',
        md : 'block'
      },
      minHeight:'100vh'
    }}
    >
      <Profile/>
      <CreateTaskForm />
    </Grid>
  );
};
