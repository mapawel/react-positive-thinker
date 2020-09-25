import React from 'react';
import styled from 'styled-components';
import {
  FormControl, InputLabel, OutlinedInput, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    light: {
    backgroundColor: theme.palette.success.light,
}
}));

const InputItem = ({ fullWidth, variant, id, type, onChange, value, label, children, light }) => {
    const classes = useStyles();
    const inputClass= light ? classes.light : null;
    return(
  <FormControl
    fullWidth={fullWidth}
    variant={variant}
  >
    <InputLabel
      htmlFor={id}
    >
      {children}
    </InputLabel>
    <OutlinedInput
        className={inputClass}
      id={id}
      type={type}
      onChange={onChange}
      value={value}
      label={label}
    />
  </FormControl>
);
    };

export default InputItem;
