import {FC, ReactElement} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ISelectField } from "./interfaces";

export const TaskSelectField : FC<ISelectField> = (props ) : ReactElement => {

  const {name = 'selectBox',value = '',disabled = false, items = [{value : '', label : 'Add Items'}],label = 'Select Box',onChange = (e: SelectChangeEvent) => console.log(e) } = props
  
    return (
        <FormControl fullWidth size="small">
        <InputLabel id={`${name}-id`}>{label}</InputLabel>
        <Select
        labelId={`${name}-id`}
        id={`${name}-id-select`}
        label={value}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        >
          {

          items.map((item,i) => (
          <MenuItem key={i} value={item.value}>{item.label}</MenuItem>
          ))
          }
        </Select>
       
      </FormControl>
    );
}