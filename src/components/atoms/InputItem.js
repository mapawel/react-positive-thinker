import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, OutlinedInput, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  light: {
    backgroundColor: theme.palette.success.light,
  },
}));

const InputItem = ({
  fullWidth, variant, id, type, onChange, value, label, children, light,
}) => {
  const classes = useStyles();
  const inputClass = light ? classes.light : null;
  return (
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

InputItem.propTypes = {
  fullWidth: PropTypes.bool,
  variant: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
};

InputItem.defaultProps = {
  fullWidth: false,
  light: false,
};

export default InputItem;
