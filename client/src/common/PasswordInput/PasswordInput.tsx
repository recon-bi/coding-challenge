import React from 'react';
import MDInput from 'ui/MDInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface Props {
  onChange: (newValue: string) => void;
}

function PasswordInput({ onChange }: Props) {
  const [value, setValue] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MDInput
      type={showPassword ? 'text' : 'password'}
      label="Password"
      value={value}
      onChange={handlePassword}
      required={true}
      sx={{ width: 425 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
