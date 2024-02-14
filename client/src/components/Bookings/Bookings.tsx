import DataTable from 'common/DataTable';
import DashboardLayout from 'layouts/Dashboard';
import DashboardNavbar from 'layouts/Navbar';
import BookingsModel from 'models/bookings.model';
import { useDispatch } from 'react-redux';
import { userActions } from 'redux/actions';
import columns from './bookings.columns';

function Bookings() {
  const modelInstance = BookingsModel.getInstance();
  const dispatch = useDispatch();

  const handleRowClick = ({ original }: any) => {
    // dispatch(loggersActions.viewItem({ viewItem }));
    console.log(dispatch, userActions, original);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DataTable columns={columns} modelInstance={modelInstance} onRowClick={handleRowClick}  />
    </DashboardLayout>
  );
}

export default Bookings;
