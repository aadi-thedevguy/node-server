import React, { FC, ReactElement,Suspense } from 'react';
import { ISideBar } from "./interfaces";

const CreateTaskForm = React.lazy(() => import('../createTaskForm/createTaskForm'))
const Profile = React.lazy(() => import('../profile/profile'))
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const Sidebar: FC<ISideBar> = (props): ReactElement => {

  const {setOpen} = props

  return (
    <Grid
      sx={{
      minHeight:'80vh',
      width: {sm : '100%', lg : '40vw'}
    }}
    >
    <Suspense fallback={<CircularProgress />}>
      <Profile/>
      <CreateTaskForm setOpen={setOpen} />
    </Suspense>
    </Grid>
  );
};
