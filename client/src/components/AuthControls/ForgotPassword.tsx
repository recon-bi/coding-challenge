import React, { useState } from 'react';
import Modal from 'common/Modal';
import MDBox from 'ui/MDBox';
import MDButton from 'ui/MDButton';
import MDInput from 'ui/MDInput';
import { authContext } from 'context/AuthContext';
import MDTypography from 'ui/MDTypography';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import CircleCheck from 'common/CircleCheck';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import { Hidden } from '@mui/material';

interface Props {
  show: boolean;
}

const initialState = {
  hasLength: false,
  hasUpper: false,
  hasLower: false,
  hasSpecial: false,
  hasNoIllegals: false,
  passwordMatch: true,
};

function ForgotPassword({ show }: Props) {
  const [showModal, setShowModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { forgotPassword, confirmForgotPassword } = React.useContext<any>(authContext);
  const [validity, setValidity] = React.useState<any>(initialState);
  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowConfirmModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value, name } = e.target;
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'newPassword':
        return setNewPassword(value);
      case 'confirmPassword':
        return setConfirmPassword(value);
      case 'verificationCode':
        return setVerificationCode(value);
      default:
        return null;
    }
  };

  const validate = () => {
    const validation: any = {
      hasLength: newPassword.length >= 12,
      hasUpper: /[A-Z]/.test(newPassword),
      hasLower: /[a-z]/.test(newPassword),
      hasSpecial: /[!@#$%^&*_+\-=[\];|,.<>/?~]/.test(newPassword),
      hasNoIllegals: !/[[\];,.()/~]/.test(newPassword),
      passwordMatch: confirmPassword.length > 0 && newPassword.length > 0 ? newPassword === confirmPassword : true,
    };
    setValidity(validation);
    return Object.keys(validation).every((key) => validation[key] === true);
  };

  const handleSubmit = async () => {
    if (username) {
      await forgotPassword({ username });
      setShowModal(false);
      setShowConfirmModal(true);
      Swal.fire(
        'Verification Code Sent',
        'A verification code has been sent to the email address associated with the username entered.<div style="margin-top:20px; padding:10px; font-size:0.9rem;">If this is your first login and you are trying to reset your temporary password, you will need to contact IT Support <br/><a href="mailto:daniel@skiline.co.uk">daniel@skiline.co.uk</a></p>',
        'info',
      );
    }
  };

  const handleConfirmReset = async () => {
    if (username && verificationCode && newPassword && newPassword === confirmPassword) {
      await confirmForgotPassword({ username, verificationCode, newPassword });
      setShowConfirmModal(false);
      Swal.fire('Password Reset Successful', 'Your password has been reset successfully.', 'success');
    }
  };

  React.useEffect(() => {
    setTimeout(validate, 100);
  }, [newPassword, confirmPassword]);

  const { hasLength, hasUpper, hasLower, hasSpecial, passwordMatch } = validity;
  const size = 30;
  const iconStyle = { width: size, height: size, mb: '-4px', ml: '3px', p: 0 };

  return (
    <MDBox ml={1}>
      <MDButton variant="text" color="primary" sx={{ margin: 0, padding: 0 }} onClick={handleClick}>
        Forgotten Password?
      </MDButton>
      <Modal
        showModal={showModal}
        onModalClose={handleClose}
        cssOverrides={{ maxWidth: 500 }}
        disableEscapeKeyDown
        disableBackdropClick
      >
        <MDBox>
          <MDTypography variant="h5">Forgotten Password</MDTypography>
        </MDBox>
        <MDBox mt={2}>
          <MDInput name="username" value={username} label="Username" onChange={handleChange} fullWidth />
        </MDBox>

        <MDBox mt={2} display="flex">
          <MDBox>
            <MDButton color="primary" onClick={handleSubmit}>
              reset password
            </MDButton>
          </MDBox>

          <MDBox ml={2}>
            <MDButton color="error" onClick={handleClose}>
              Cancel
            </MDButton>
          </MDBox>
        </MDBox>
      </Modal>

      <Modal
        showModal={showConfirmModal}
        onModalClose={handleClose}
        cssOverrides={{ maxWidth: 500 }}
        disableEscapeKeyDown
        disableBackdropClick
      >
        <MDBox>
          <MDTypography variant="h5">Confirm New Password</MDTypography>
        </MDBox>
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
                  Passwords should be 12 or more characters long
                </Grid>

                <Grid item xs={1}>
                  {hasUpper ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                </Grid>
                <Grid item xs={11}>
                  Contain at least 1 upper case letter
                </Grid>

                <Grid item xs={1}>
                  {hasLower ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                </Grid>
                <Grid item xs={11}>
                  Contain at least 1 lower case letter
                </Grid>

                <Grid item xs={1}>
                  {hasSpecial ? <CircleCheck /> : <CircleIcon sx={iconStyle} color="disabled" />}
                </Grid>
                <Grid item xs={11}>
                  Contain at least 1 special character
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Hidden>
        <MDBox component="form" onSubmit={handleSubmit}>
          <MDBox mb={2}>
            <MDInput
              name="verificationCode"
              value={verificationCode}
              label="Verification Code"
              onChange={handleChange}
              fullWidth
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
              fullWidth
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
              helperText="New Password must match Confirmed Password"
              fullWidth
            />
          </MDBox>
          <MDBox mt={2} display="flex">
            <MDBox>
              <MDButton color="primary" onClick={handleConfirmReset}>
                Confirm Password Reset
              </MDButton>
            </MDBox>
            <MDBox ml={2}>
              <MDButton color="error" onClick={handleClose}>
                Cancel
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

ForgotPassword.defaultProps = {
  show: false,
};

export default ForgotPassword;
