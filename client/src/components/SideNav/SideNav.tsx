import React, { ReactNode } from 'react';
// react-router-dom components
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from 'components/SideNav/SideNavCollapse';
import SidenavList from 'components/SideNav/SideNavList';
import SidenavItem from 'components/SideNav/SideNavItem';

// Custom styles for the Sidenav
import SidenavRoot from 'components/SideNav/SideNavRoot';
import sidenavLogoLabel from 'components/SideNav/styles/sidenav';

// Material Dashboard 2 PRO React context
import { useMaterialUIController, setMiniSidenav, setTransparentSidenav, setWhiteSidenav } from 'context/ThemeContext';
import { authContext } from 'context/AuthContext';
import icon from '../../favicon-32x32.png';

// import swIcon from 'assets/images/logos/southern-water/swIcon.png'
// Declaring props types for Sidenav
interface Props {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark';
  brand?: string;
  brandName: string;
  routes: {
    [key: string]:
      | ReactNode
      | string
      | {
          [key: string]:
            | ReactNode
            | string
            | {
                [key: string]: ReactNode | string;
              }[];
        }[];
  }[];
  [key: string]: any;
}

function SideNav({ color, brand, brandName, routes, ...rest }: Props): JSX.Element {
  const [openCollapse, setOpenCollapse] = React.useState<boolean | string>(false);
  const [openNestedCollapse, setOpenNestedCollapse] = React.useState<boolean | string>(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split('/').slice(1)[0];
  const items = pathname.split('/').slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];
  const { logout, isAllowed } = React.useContext(authContext);
  const navigate = useNavigate();
  let textColor:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'white'
    | 'inherit'
    | 'text'
    | 'light' = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const logoutUser = () => {
    logout();
    navigate('/auth');
  };

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  React.useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, []);

  React.useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /**
     The event listener that's calling the handleMiniSidenav function when resizing the window.
     */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) => {
    const template = collapse.map(({ name, route, key, href }: any) =>
      href ? (
        <Link key={key} href={href} target="_blank" rel="noreferrer" sx={{ textDecoration: 'none' }}>
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} style={{ textDecoration: 'none' }}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      ),
    );

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(({ name, collapse, route, href, key }: any) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            active={key === itemParentName ? 'isParent' : false}
            open={openNestedCollapse === key}
            onClick={({ currentTarget }: any) =>
              openNestedCollapse === key && currentTarget.classList.contains('MuiListItem-root')
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(key)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link href={href} key={key} target="_blank" rel="noreferrer" sx={{ textDecoration: 'none' }}>
            <SidenavItem color={color} name={name} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key} style={{ textDecoration: 'none' }}>
            <SidenavItem color={color} name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, collapse, noCollapse, key, href, route, allow }: any) => {
    let returnValue;

    if (type === 'collapse') {
      if (href) {
        returnValue = (
          <Link href={href} key={key} target="_blank" rel="noreferrer" sx={{ textDecoration: 'none' }}>
            <SidenavCollapse name={name} icon={icon} active={key === collapseName} noCollapse={noCollapse} />
          </Link>
        );
      } else if (noCollapse && route) {
        returnValue = (
          <NavLink to={route} key={key}>
            <SidenavCollapse name={name} icon={icon} noCollapse={noCollapse} active={key === collapseName}>
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          </NavLink>
        );
      } else {
        returnValue = (
          <SidenavCollapse
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            open={openCollapse === key}
            onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
          >
            {collapse ? renderCollapse(collapse) : null}
          </SidenavCollapse>
        );
      }
    } else if (type === 'title') {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {miniSidenav ? '' : title}
        </MDTypography>
      );
    } else if (type === 'logout') {
      returnValue = (
        <SidenavCollapse
          key={key}
          name={name}
          icon={icon}
          active={key === collapseName}
          noCollapse={noCollapse}
          onClick={logoutUser}
        />
      );
    } else if (type === 'divider') {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) || (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }
    if (allow && !isAllowed(allow)) returnValue = null;
    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}>
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox className="dashboard" component={NavLink} to="/" display="flex" alignItems="center">
          {miniSidenav ? (
            <MDBox component="img" src={icon} alt="Brand" width="2rem" />
          ) : (
            <MDBox component="img" src={brand} alt="Brand" width="10rem" />
          )}
          <MDBox width={!brandName ? '100%' : '0%'} sx={(theme: any) => sidenavLogoLabel(theme, { miniSidenav })}>
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={(!darkMode && !whiteSidenav && !transparentSidenav) || (darkMode && !transparentSidenav && whiteSidenav)}
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Declaring default props for Sidenav
SideNav.defaultProps = {
  color: 'info',
  brand: '',
};

export default SideNav;
