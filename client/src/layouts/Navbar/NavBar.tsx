import React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';
import MDBox from 'ui/MDBox';
import Breadcrumbs from 'ui/MDBreadcrumbs';
import NotificationItem from 'ui/MDNotificationItem';
// import { authContext } from 'context/AuthContext';

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from 'layouts/Navbar/styles';


// Material Dashboard 2 PRO React context
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav, setOpenConfigurator } from 'context/index';


// Declaring prop types for DashboardNavbar
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}

function DashboardNavbar({ absolute, light, isMini }: Props): JSX.Element {
  const [navbarType, setNavbarType] = React.useState<'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'>();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = React.useState<any>(false);
  const route = useLocation().pathname.split('/').slice(1);
  // const { isAllowed } = React.useContext(authContext);

  React.useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => {
    setMiniSidenav(dispatch, !miniSidenav);
    // const mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0] as HTMLElement;
    // const mapDiv = document.getElementsByClassName('mapboxgl-map')[0] as HTMLElement;
    // mapDiv.style.width = '100%';
    // mapCanvas.style.width = '100%';
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  // const handleOpenMenu = (event: any) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference="anchorEl"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Leakage Alert - Boxgrove" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }: { palette: any; functions: any }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? 'relative' : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={navbarContainer}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          {/* <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton> */}
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? 'white' : 'inherit'} display="flex">
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>

              <IconButton size="small" disableRipple color="inherit" sx={navbarMobileMenu} onClick={handleMiniSidenav}>
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Declaring default props for DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar;
