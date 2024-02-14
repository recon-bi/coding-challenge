import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Configurator from 'ui/MDConfigurator';
import themeDark from 'assets/theme-dark';
import theme from 'assets/theme';
import { setMiniSidenav, useMaterialUIController } from 'context/index';
import routes from 'routes';
import Sidenav from 'components/SideNav';
import { authContext } from 'context/AuthContext';
import AuthControls from 'components/AuthControls';
import Dashboard from 'components/Dashboard';
import './App.css';
import { history } from 'config/history';
import { Modal } from 'common/Modal';
import MDButton from 'ui/MDButton'; // Import the history helper
import MDBox from 'ui/MDBox';
import Error403 from './Error403';
import logo from './logo.png';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAllowed, isModalOpen, handleModalClose, logout, user } = React.useContext<any>(authContext);
  const modalTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  history.navigate = useNavigate();
  history.location = useLocation();
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  React.useEffect(() => {
    if (isModalOpen) {
      if (modalTimeout.current) {
        clearTimeout(modalTimeout.current);
        modalTimeout.current = null;
      }
      modalTimeout.current = setTimeout(
        () => {
          handleModalClose();
          logout(); // Logout the user after 2 more minutes of inactivity
          navigate('/auth', {
            replace: true,
            state: { message: 'Session Timed Out, Please Login Again' },
          });
        },
        2 * 60 * 1000,
      );
    } else {
      if (modalTimeout.current) {
        clearTimeout(modalTimeout.current);
        modalTimeout.current = null;
      }
    }
  }, [isModalOpen]);

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  React.useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes: any[]): any =>
    allRoutes.map(
      (route: {
        collapse: any;
        route: string;
        component: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
        key: React.Key;
        allow: string[];
      }) => {
        if (!route.allow || isAllowed(route.allow)) {
          if (route.collapse) {
            return getRoutes(route.collapse);
          }

          if (route.route) {
            return <Route path={route.route} element={route.component} key={route.key} />;
          }
        } else {
          return <Route path={route.route} element={<Error403 />} key={route.key} />;
        }

        return null;
      },
    );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === 'dashboard' && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={logo}
            brandName=""
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />

          <Configurator />
          {/* {configsButton} */}
          <Modal showModal={isModalOpen} onModalClose={handleModalClose} width={50}>
            <p>
              You've been inactive for 5 Minutes. Click OK to continue your session otherwise you will be automatically
              logged out after 2 minutes.
            </p>
            <MDButton onClick={handleModalClose}>Ok</MDButton>
          </Modal>
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <Routes>
        <Route path="/auth/*" element={<AuthControls />} />
        {<Route path="/" element={<Dashboard />} />}
        { getRoutes(routes)} 
    
        {user && !user.ChallengeName ? (
          <>
            {getRoutes(routes)}
            
            <Route
              path="/"
              element={
                !user.roles ? (
                  <MDBox padding={5}>
                    It looks like your login was not assigned to any access groups. Contact IT support regarding this
                    issue. <br /> <br />
                    <br /> <br />
                    Please logout now in order to login with your new credentials once we have rectified this issue
                    <MDBox mt={1}>
                      <MDButton onClick={logout}>Logout</MDButton>
                    </MDBox>
                  </MDBox>
                ) : (
                  <Dashboard />
                )
              }
            />
          </>
        ) : (
            
          <Route path="*" element={<AuthControls />} />
        )}
        
      </Routes>
    </ThemeProvider>
  );
}
