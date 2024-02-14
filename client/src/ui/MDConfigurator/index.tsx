import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Switch from '@mui/material/Switch';
import { setDarkMode, setOpenConfigurator, useMaterialUIController } from 'context/index';
// import { authContext } from 'context/AuthContext';
import MDBox from 'ui/MDBox';
import ConfiguratorRoot from 'ui/MDConfigurator/ConfiguratorRoot';
import MDTypography from 'ui/MDTypography';
import MDButton from 'ui/MDButton';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const APP_NAME = import.meta.env.VITE_APPLICATION_NAME;

function Configurator(): JSX.Element {
  const [controller, dispatch] = useMaterialUIController();
  // const { getUserRoles } = React.useContext(authContext);
  const { openConfigurator, darkMode } = controller;
  const navigate = useNavigate();

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  const handleChangePassword = () => navigate('/auth/change-password');

  // const roles = getUserRoles();

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="baseline" pt={4} pb={0.5} px={3}>
        <MDBox>
          <MDTypography variant="h5">{APP_NAME} Configuration</MDTypography>
          <MDTypography variant="body2" color="text" component="div">
            Theme Settings
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: 'currentColor',
            strokeWidth: '2px',
            cursor: 'pointer',
            transform: 'translateY(5px)',
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <MDBox pt={0.5} pb={3} px={3}>
        <Divider />

        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="body2">Light / Dark</MDTypography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>

        <Divider />

        <MDBox mt={4} sx={{ whiteSpace: 'normal' }}>
          <MDTypography variant="h6">My Account</MDTypography>
          <Alert severity="info">You can change your password at any time using the link below</Alert>
          <MDBox mt={1}>
            <MDButton variant="contained" color="primary" size="small" onClick={handleChangePassword}>
              Change Password
            </MDButton>
          </MDBox>
        </MDBox>

      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
