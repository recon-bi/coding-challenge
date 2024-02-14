import Icon from '@mui/material/Icon';
import Bookings from 'components/Bookings/Bookings';
import Hotels from 'components/Hotels';

const routes = [
  {
    type: 'title',
    title: 'Main Meny',
    key: 'title-main',
    noCollapse: true,
    // allow: ['DataAdmin', 'Admin'],
  },
  {
    type: 'collapse',
    name: 'Hotels',
    key: 'hotels',
    icon: <Icon fontSize="medium">home_work</Icon>,
    noCollapse: true,
    component: <Hotels />,
    route: '/hotels',
  },
  {
    type: 'collapse',
    name: 'My Bookings',
    key: 'bookings',
    icon: <Icon fontSize="medium">people</Icon>,
    noCollapse: true,
    component: <Bookings />,
    route: '/bookings',
    // allow: [],
  },

  {
    type: 'logout',
    name: 'Logout',
    icon: <Icon fontSize="medium">logout</Icon>,
    title: 'Logout',
    key: 'Logout',
    noCollapse: true,
  },
];

export default routes;
