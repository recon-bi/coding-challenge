import React, { ChangeEvent } from 'react';
import MDBox from 'ui/MDBox';
import MDButton from 'ui/MDButton';
import MDInput from 'ui/MDInput';
import CitySearch from './CitySearch';
import CountrySearch from './CountrySearch';
import DateRangeSearch from './DateRangeSearch';

interface Props {
  onSearch: (search: any) => void;
}

function HotelSearch({ onSearch }: Props) {
  const [search, setSearch] = React.useState({
    startDate: null,
    endDate: null,
  });

  const setSearchParams = (name: string, value: string) => {
    if (value) {
      setSearch({
        ...search,
        [name]: value,
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

  const handleSearch = () => onSearch(search);

  return (
    <MDBox display="flex">
      <MDBox width={400}>
        <DateRangeSearch onChange={handleDateRangeChange} />
      </MDBox>
      <MDBox width={175} ml={1}>
        <CitySearch onSelected={setSearchParams} />
      </MDBox>
      <MDBox width={175} ml={1}>
        <CountrySearch onSelected={setSearchParams} />
      </MDBox>
      <MDBox width={100} ml={1}>
        <MDInput label="Min £" width={50} type="number" name="priceMin" onChange={handleComponentChange} />
      </MDBox>
      <MDBox width={100} ml={1}>
        <MDInput label="Max £" width={50} type="number" name="priceMax" onChange={handleComponentChange} />
      </MDBox>
      <MDBox ml={1} mt={0.2}>
        <MDButton onClick={handleSearch} variant="contained" color="primary">
          Search
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default HotelSearch;
