import React from 'react';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import { navbarIconButton } from 'layouts/Navbar/styles';
import MDBadge from 'ui/MDBadge';
import NotificationItem from 'ui/MDNotificationItem';
// import { getStatusColor } from 'lib/utils/colors';
import { SvgIconProps } from 'assets/icons/types';
import useDarkMode from 'hooks/useDarkMode';
import MenuItem from '@mui/material/MenuItem';
import MDTypography from 'ui/MDTypography';

interface Props {
  CustomSvgIcon?: React.FC<SvgIconProps>;
  iconName?: string;
  notifications: any[];
  handleClick: (item: any) => void;
  count: number;
  title: string;
}

function IconMenu({ CustomSvgIcon, iconName, notifications, handleClick, count, title }: Props) {
  const darkMode = useDarkMode();
  const [openMenu, setOpenMenu] = React.useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  return (
    <>
      <IconButton size="small" color="inherit" onClick={handleOpenMenu} sx={navbarIconButton}>
        <MDBadge badgeContent={count} color="error" size="xs" circular>
          {CustomSvgIcon && (
            <CustomSvgIcon width={48} height={48} fill={darkMode ? 'rgba(255, 255, 255, 0.6)' : '#7b809a'} />
          )}
          {iconName && (
            <Icon
              sx={{
                ...navbarIconButton,
                ...{ color: darkMode ? 'rgba(255, 255, 255, 0.6)' : '#7b809a' },
              }}
            >
              {iconName}
            </Icon>
          )}
        </MDBadge>
      </IconButton>
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
        <MenuItem>
          <MDTypography variant="h6" m={1}>
            {title}
          </MDTypography>
        </MenuItem>
        {notifications.map((item: any) => {
          return (
            <NotificationItem
              key={item._id}
              icon={<Icon>notifications</Icon>}
              title={`${item.dmaCode} - ${item.alertDescription}`}
              sx={{
                fontWeight: item.viewed ? 400 : 600,
              }}
              onClick={() => handleClick(item)}
            />
          );
        })}
      </Menu>
    </>
  );
}

IconMenu.defaultProps = {
  CustomSvgIcon: null,
  iconName: null,
};

export default IconMenu;
