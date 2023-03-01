import React, { FC, ReactElement,Suspense } from 'react';

const CreateTaskForm = React.lazy(() => import('../createTaskForm/createTaskForm'))
const Profile = React.lazy(() => import('../profile/profile'))
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const Sidebar: FC = (): ReactElement => {
  return (
    <Grid
      item
      md={4}
      sx={{display : {
        sm : 'none',
        md : 'block'
      },
      minHeight:'80vh'
    }}
    >
    <Suspense fallback={<CircularProgress />}>
      <Profile/>
      <CreateTaskForm />
    </Suspense>
    </Grid>
  );
};
