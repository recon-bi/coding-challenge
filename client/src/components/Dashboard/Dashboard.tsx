import MDBox from 'ui/MDBox';
import DashboardLayout from 'layouts/Dashboard';
import DashboardNavbar from 'layouts/Navbar';
import Footer from 'layouts/Footer';
import { Card } from '@mui/material';

import logo from "src/logo.png"
import MDTypography from 'ui/MDTypography';

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={2} alignContent="center">
        <Card sx={{ width: '80vh', alignContent: "center" }}>
          <MDBox width="80vh" position="relative" height="50vh">
          <MDBox width={800} height={300} position="absolute" top="25%" left="25%" sx={{transform: 'translate(-50%. -50%)'}}>
            <MDBox >
              <img src={logo} alt="logo" />
            </MDBox>
            
            <MDBox>
              <MDTypography fontSize="1.1rem">
                Welcome to the Hotel Search and Booking app
              </MDTypography>
            </MDBox>
          </MDBox>
          </MDBox>

        </Card>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
