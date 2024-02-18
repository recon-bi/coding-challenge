import CommonAutocomplete from 'common/Autocomplete/Autocomplete';
import DataCard from 'common/DataCard';
import DataTable from 'common/DataTable';
import BookingForm from 'components/Bookings/BookingForm';
import DashboardLayout from 'layouts/Dashboard';
import DashboardNavbar from 'layouts/Navbar';
import HotelsModel from 'models/hotels.model';
import React, { ChangeEvent } from 'react';
import handleError from 'src/errors';
import { AutocompleteOptionType } from 'types/common';
import MDBox from 'ui/MDBox';
import MDInput from 'ui/MDInput';
import HotelSearch from './HotelSearch';
import columns from './hotels.columns';
import dayjs from 'dayjs';

function Hotels() {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState({
    startDate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
    endDate: dayjs().add(3, 'days').format('YYYY-MM-DD'),
  });
  const [cityOptions, setCityOptions] = React.useState([]);
  const [countryOptions, setCountryOptions] = React.useState([]);
  const [showBookingForm, setShowBookingForm] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const modelInstance = HotelsModel.getInstance();

  const handleRowClick = ({ original }: any) => {
    setSelectedItem(original);
    setShowBookingForm(true);
  };

  const setSearchParams = (name: string, value: AutocompleteOptionType | null) => {
    if (value) {
      setSearch({
        ...search,
        [name]: value.label,
      });
    }
  };

  const handleComponentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchParams(name, value);
  };

  const handleDateRangeChange = (dates: any) => {
    setSearch({
      ...search,
      ...dates,
    });
  };

  React.useEffect(() => {
    const getData = async () => {
      const data = await modelInstance.getSearchResults(search);
      setData(data);
    };
    getData();
  }, [search]);

  React.useEffect(() => {
    const getCounties = async () => {
      try {
        const results = await modelInstance.getSearchOptions();
        setCityOptions(results.cities.map((label: string) => ({ label })));
        setCountryOptions(results.countries.map((label: string) => ({ label })));
      } catch (error) {
        handleError(error);
      }
    };

    getCounties();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={1} mt={1}>
        <DataCard title="Search for hotels">
          <MDBox display="flex" mt={1}>
            <MDBox width={400}>
              <HotelSearch onChange={handleDateRangeChange} />
            </MDBox>
            <MDBox width={175} ml={1}>
              <CommonAutocomplete
                options={cityOptions}
                label="City"
                onSelected={(item: AutocompleteOptionType | null) => setSearchParams('city', item)}
              />
            </MDBox>
            <MDBox width={175} ml={1}>
              <CommonAutocomplete
                options={countryOptions}
                label="Country"
                onSelected={(item: AutocompleteOptionType | null) => setSearchParams('country', item)}
              />
            </MDBox>
            <MDBox width={100} ml={1}>
              <MDInput label="Min £" width={50} type="number" name="priceMin" onChange={handleComponentChange} />
            </MDBox>
            <MDBox width={100} ml={1}>
              <MDInput label="Max £" width={50} type="number" name="priceMax" onChange={handleComponentChange} />
            </MDBox>
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
