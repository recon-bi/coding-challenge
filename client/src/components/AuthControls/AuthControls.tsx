import { Routes, Route } from 'react-router-dom';
import MDBox from 'ui/MDBox';
import logo from '../../logo.png';
import Login from 'components/AuthControls/Login';
import Logout from 'components/AuthControls/Logout';
import ChangePassword from 'components/AuthControls//ChangePassword';
import ForgotPassword from 'components/AuthControls//ForgotPassword';
import PageLayout from 'layouts/PageLayout';

export default function AuthComponents() {
  return (
    
    <PageLayout>

      <div className="inner-header flex">
        <MDBox component="img" alt="Logo" src={logo} mt="-30%" width="500px" />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </PageLayout>
  );
}
