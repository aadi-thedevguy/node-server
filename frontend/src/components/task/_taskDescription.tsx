import { Box, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { ITaskDescription } from './interfaces';

export const TaskDescription: FC<ITaskDescription> = (
  props,
): ReactElement => {
  //  Destructure Props
  const { description = 'Lorem ipsum dolor sit amet' } =
    props;

  return (
    <Box>
      <Typography>{description}</Typography>
    </Box>
  );
};

