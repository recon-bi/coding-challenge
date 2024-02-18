import MDBox from 'ui/MDBox';
import DashboardLayout from 'layouts/Dashboard';
import DashboardNavbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import { Card, Hidden } from '@mui/material';
import logo from 'assets/logo.png';
import MDTypography from 'ui/MDTypography';
import MDButton from 'ui/MDButton';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/hotels', { replace: true });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={2} alignContent="center">
        <Card sx={{ alignContent: 'center' }}>
          <MDBox position="relative" height="45vh" minHeight={325}>
            <MDBox position="absolute" top="25%" left="25%" sx={{ transform: 'translate(-50%. -50%)' }} pr={10}>
              <MDBox>
                <img src={logo} alt="logo" width="80%" style={{ maxWidth: 585 }} />
              </MDBox>

              <MDBox mt={2}>
                <MDTypography variant="h6">Welcome to the Hotel Search and Booking app</MDTypography>
              </MDBox>

              <Hidden smUp>
                <MDBox mt={2}>
                  <MDButton color="primary" mt={1} onClick={handleClick}>
                    Get Started
                  </MDButton>
                </MDBox>
              </Hidden>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
