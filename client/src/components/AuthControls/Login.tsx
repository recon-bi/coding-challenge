import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import { authContext } from 'context/AuthContext';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MDBox from 'ui/MDBox';
import MDButton from 'ui/MDButton';
import MDInput from 'ui/MDInput';
import MDTypography from 'ui/MDTypography';
import ForgotPassword from './ForgotPassword';
import PasswordInput from 'common/PasswordInput';

interface LocationState {
  message?: string;
}
export default function Login() {
  const { login, getUserRedirectPath } = React.useContext<any>(authContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = React.useState<string>((location.state as LocationState)?.message || '');

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!username.length || !password.length) return setError('Username and password are required fields');

    const response = await login({ username: username, password: password });

    if (response) {
      if (response.statusText === 'Unauthorized') {
        return setError('Incorrect username or password');
      }
      if (response.ChallengeName && response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        navigate('/auth/change-password');
      }
      if (response.message === 'User authenticated successfully') {
        const { roles } = response.data;
        const redirectUrl = getUserRedirectPath(roles);
        navigate(redirectUrl, { replace: true });
      }
      return response;
    } else {
      return setError('There was a problem logging in please contact support.');
    }
  };

  return (
    <MDBox width="500px" margin="0px auto" mt="-30%" mb="5%" height="100vh" textAlign="left">
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDTypography variant="h5">Please Login</MDTypography>
          </MDBox>

          {error && (
            <MDBox mb={2}>
              <Alert severity="error">{error}</Alert>
            </MDBox>
          )}

          <MDBox mb={2}>
            <MDInput
              name="username"
              id="username"
              label="Username"
              onChange={(e: any) => setUsername(e.target.value)}
              sx={{ width: 425 }}
            />
          </MDBox>

          <MDBox mb={1}>
            <PasswordInput onChange={(newValue: string) => setPassword(newValue)} />
            {/* <MDInput
              type="password"
              id="password"
              name="password"
              label="Password"
              fullWidth
              onChange={(e: any) => setPassword(e.target.value)}
            />  */}
          </MDBox>
          <MDBox display="flex">
            <ForgotPassword />
          </MDBox>
          <MDBox mt={1} mb={1}>
            <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
              sign in
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}
