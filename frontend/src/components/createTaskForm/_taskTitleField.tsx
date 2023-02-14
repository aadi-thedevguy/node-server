import React, { FC, ReactElement } from 'react';

import { ITextField } from './interfaces';
import { TextField } from '@mui/material';

export const TaskTitleField: FC<ITextField> = (
  props,
): ReactElement => {
  //  Destructure props
  const {
    value = '',
    onChange = (e) => console.log(e),
    disabled = false,
  } = props;

  return (
    <TextField
      id="title"
      label="Task Title"
      placeholder="Task Title"
      variant="outlined"
      size="small"
      name="title"
      fullWidth
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
