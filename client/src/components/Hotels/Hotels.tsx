import DataCard from 'common/DataCard';
import DataTable from 'common/DataTable';
import BookingForm from 'components/Bookings/BookingForm';
import DashboardLayout from 'layouts/Dashboard';
import DashboardNavbar from 'layouts/Navbar';
import HotelsModel from 'models/hotels.model';
import React from 'react';
import MDBox from 'ui/MDBox';
import HotelSearch from '../HotelSearch/HotelSearch';
import columns from './hotels.columns';

const modelInstance = HotelsModel.getInstance();

interface Props {
  initialSearch?: any;
}

function Hotels({ initialSearch = {} }: Props) {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState(initialSearch);
  const [showBookingForm, setShowBookingForm] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  const handleRowClick = ({ original }: any) => {
    setSelectedItem(original);
    setShowBookingForm(true);
  };

  React.useEffect(() => {
    console.log(search);
    const getData = async () => {
      const data = await modelInstance.getSearchResults(search);
      setData(data);
    };
    getData();
  }, [search]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mb={1} mt={1}>
        <DataCard title="Search for hotels">
          <MDBox mt={1}>
            <HotelSearch onSearch={setSearch} />
          </MDBox>
        </DataCard>
      </MDBox>

      <DataTable
        columns={columns}
        rows={data}
        onRowClick={handleRowClick}
        manualFilters={false}
        manualPagination={false}
      />

      <BookingForm
        selectedItem={selectedItem}
        showModal={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        selections={search}
      />
    </DashboardLayout>
  );
}

export default Hotels;
