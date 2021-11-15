import React from 'react';
import { InputBaseComponentProps, TextField } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import styles from './TextInput.module.scss';
import InputAdornment from '@material-ui/core/InputAdornment';
import WarningIcon from '@material-ui/icons/Warning';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

export interface ErrorMessage {
  error: boolean;
  message: string;
}

interface TextInputProps {
  toolTip?: { message: string; altText: string };
  hiddenText?: boolean;
  validator?: (val: string) => { error: boolean; message: string };
  label: string;
  multiline?: boolean;
  disabled?: boolean;
  onChange?: (val: string) => void;
  id?: string;
  icon?: React.ReactElement;
  frontIcon?: React.ReactElement;
  initErrorState?: ErrorMessage;
  error?: ErrorMessage;
  value?: string;
  inputComponent?: React.ElementType<InputBaseComponentProps>;
  validateOnLoad?: boolean;
}

const getToolTip = (message: string) => {
  return (
    <Tooltip title={message}>
      <HelpIcon
        aria-label={`${message}: input help`}
        className={styles['tool-tip']}
      />
    </Tooltip>
  );
};

const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#005F86',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#005F86',
      },
      '&.Mui-focused.Mui-error fieldset': {
        borderColor: '#C9302C',
      },
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      backgroundColor: '#EFEFF0',
    },
  },
})(TextField);

export const TextInput: React.FC<TextInputProps> = ({
  toolTip,
  hiddenText = false,
  label,
  onChange,
  frontIcon,
  icon,
  validator,
  disabled,
  multiline,
  initErrorState = {
    error: false,
    message: '',
  },
  id,
  error,
  value,
  inputComponent,
  validateOnLoad = false,
}) => {
  const [validationError, setValidationErrorState] = React.useState(
    initErrorState
  );
  const hasError = error ? error.error : validationError.error;
  const errorMessage = error ? error.message : validationError.message;
  const adornmentIcon = hasError ? (
    <WarningIcon aria-label={'error-icon'} />
  ) : (
    icon
  );

  const inputIcon = (icon || hasError) && (
    <InputAdornment aria-label={'input-icon'} position="end">
      {adornmentIcon}
    </InputAdornment>
  );

  const frontInputIcon = frontIcon && (
    <InputAdornment position="start">{frontIcon}</InputAdornment>
  );

  const onBlurHandler = (e: any) => {
    const { value } = e.target;
    if (validator) {
      setValidationErrorState(validator(value));
    }
  };

  const onChangeHandler = (e: any) => {
    e.persist();
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  };

  React.useEffect(() => {
    if (validateOnLoad && validator) {
      setValidationErrorState(validator(value ?? ''));
    }
  }, []);

  return (
    <div className={styles['root']}>
      <div
        className={classNames(styles['text-field-container'], {
          [`${styles['error']}`]: hasError,
        })}
      >
        <StyledTextField
          value={value}
          id={id}
          error={hasError}
          label={label}
          fullWidth={true}
          disabled={disabled}
          variant="outlined"
          multiline={multiline}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          InputProps={{
            startAdornment: frontInputIcon,
            endAdornment: inputIcon,
            inputComponent,
          }}
          type={hiddenText ? 'password' : 'text'}
        />
        {toolTip && getToolTip(toolTip.message)}
      </div>
      <div className={styles['error-message-container']}>{errorMessage}</div>
    </div>
  );
};
