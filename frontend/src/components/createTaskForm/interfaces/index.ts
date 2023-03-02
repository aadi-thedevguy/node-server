
import React from 'react';
import { SelectChangeEvent } from "@mui/material";

export interface IDisabled {
  disabled?: boolean;
}

export interface ISelectItems {
    value : string,
    label : string
}

export interface ISelectField extends IDisabled {
    name? : string,
    label?: string,
    value? : string,
    onChange? : (e:SelectChangeEvent) => void,
    items? : ISelectItems[]
}

export interface IDateField extends IDisabled {
    value? : Date | null,
    onChange? : (date : Date | null) => void
}

export interface ITextField extends IDisabled {
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
  value : string
}


