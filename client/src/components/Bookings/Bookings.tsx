import DataTable from 'common/DataTable';
import DashboardLayout from 'layouts/Dashboard';
import DashboardNavbar from 'layouts/Navbar';
import BookingsModel from 'models/bookings.model';
import columns from './bookings.columns';
import React from 'react';
import { authContext } from 'context/AuthContext';

const modelInstance = BookingsModel.getInstance();

function Bookings() {
  const [data, setData] = React.useState([]);
  const { user } = React.useContext(authContext);

  React.useEffect(() => {
    const getData = async () => {
      const data = await modelInstance.getMyBookings(user._id);
      setData(data);
    };
    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DataTable columns={columns} rows={data} manualFilters={false} manualPagination={false} />
    </DashboardLayout>
  );
}

export default Bookings;
