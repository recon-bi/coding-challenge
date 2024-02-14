import { useNavigate } from 'react-router-dom';
import { authContext } from 'context/AuthContext';
import React from 'react';

export default function Logout() {
  const { logout } = React.useContext(authContext);
  const navigate = useNavigate();
  logout();
  navigate('/');
  return <div>You have logged out</div>;
}
