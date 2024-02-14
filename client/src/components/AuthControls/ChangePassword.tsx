import Card from '@mui/material/Card';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import React from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { authContext } from 'context/AuthContext';
import MDTypography from 'ui/MDTypography';
import MDBox from 'ui/MDBox';
import { Hidden } from '@mui/material';
import CircleCheck from 'common/CircleCheck';
import MDButton from 'ui/MDButton';
import MDInput from 'ui/MDInput';
import Swal from 'sweetalert2';
import { useLocalStorage } from 'hooks/useLocalStorage';
import pwdSettings from 'config/auth';
import { PasswordValidationType } from 'types/users';

const initialState: PasswordValidationType = {
  hasLength: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpecial: false,
  hasNoIllegals: false,
  passwordMatch: true,
};

export default function ChangePassword() {
  const { changePassword, getUserRedirectPath, login, validatePassword } = React.useContext<any>(authContext);
  const [validity, setValidity] = React.useState<PasswordValidationType>(initialState);
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [oldPassword, setOldPassowrd] = React.useState('');
  const [username] = useLocalStorage('username', null);
  const navigate = useNavigate();

  const validate = () => {
    const valid = validatePassword(newPassword, confirmPassword);
    setValidity(valid);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value, name } = e.target;
    switch (name) {
      case 'newPassword':
        return setNewPassword(value);
      case 'confirmPassword':
        return setConfirmPassword(value);
      case 'oldPassword':
        return setOldPassowrd(value);
      default:
        return null;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const valid = validatePassword(newPassword, confirmPassword);
    setValidity(valid);
    if (!valid) {
      Swal.fire(
        'Password Change Failed',
        `One or more requirements for passwords was not met! Please see the check list below and ensure each contain a green check`,
        'error',
      );
      return;
    }
    const data = new FormData(event.currentTarget);
    const response = await changePassword({
      password: data.get('confirmPassword'),
    });
    if (response) {
      const loginResponse = await login({ username, password: data.get('confirmPassword') });
      const { roles } = loginResponse.data;
      const redirectUrl = getUserRedirectPath(roles);
      navigate(redirectUrl, { replace: true });
    }
  };

  React.useEffect(() => {
    setTimeout(validate, 100);
  }, [newPassword, confirmPassword]);

  const { hasLength, hasUpper, hasLower, hasNumber, hasSpecial, passwordMatch } = validity;
  const size = 30;
  const iconStyle = { width: size, height: size, mb: '-4px', ml: '3px', p: 0 };

  return (
    <MDBox width="500px" margin="0px auto" mt="-30%" mb="5%" height="100vh">
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mt={-2} mb={1}>
            <MDTypography variant="h5">Change your Password</MDTypography>
          </MDBox>
          <MDBox>
            <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
              <MDBox mb={2}>
                <MDBox
                  alignContent="left"
                  textAlign="left"
                  fontSize="0.9rem"
                  padding={2}
                  sx={{ backgroundColor: '#eee' }}
                  borderRadius="3px"
                >
                  <Grid container>
                    <Grid item xs={1}>
                      {hasLength ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                    </Grid>
                    <Grid item xs={11}>
                      Passwords should be {pwdSettings.passwordLength} or more characters long
                    </Grid>

                    {pwdSettings.requireUpper && (
                      <>
                        <Grid item xs={1}>
                          {hasUpper ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                        </Grid>
                        <Grid item xs={11}>
                          Contain at least 1 upper case letter
                        </Grid>
                      </>
                    )}

                    {pwdSettings.requireLower && (
                      <>
                        <Grid item xs={1}>
                          {hasLower ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                        </Grid>
                        <Grid item xs={11}>
                          Contain at least 1 lower case letter
                        </Grid>
                      </>
                    )}

                    {pwdSettings.requireNumber && (
                      <>
                        <Grid item xs={1}>
                          {hasNumber ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                        </Grid>
                        <Grid item xs={11}>
                          Contain at least 1 number
                        </Grid>
                      </>
                    )}

                    {pwdSettings.requireSpecial && (
                      <>
                        <Grid item xs={1}>
                          {hasSpecial ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                        </Grid>
                        <Grid item xs={11}>
                          Contain at least 1 special character
                        </Grid>
                      </>
                    )}
                  </Grid>
                </MDBox>
              </MDBox>
            </Hidden>
            <MDBox component="form" onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  label="Old Password"
                  onChange={handleChange}
                  sx={{ width: 425 }}
                  value={oldPassword}
                  
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  value={newPassword}
                  onChange={handleChange}
                  sx={{ width: 425 }}
                  
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  error={!passwordMatch}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                  sx={{ width: 425 }}
                  helperText="New Password must match Confirmed Password"
                  
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info"  type="submit">
                  change password
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}
