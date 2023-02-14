import React, { FC, ReactElement } from 'react';

import { ITextField } from './interfaces';
import { TextField } from '@mui/material';

export const TaskDescriptionField: FC<ITextField> = (
  props,
): ReactElement => {
  //  Destructure props
  const {
    onChange = (e) => console.log(e),
    disabled = false,
    value = ''
  } = props;

  return (
    <TextField
      id="description"
      name="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      fullWidth
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
