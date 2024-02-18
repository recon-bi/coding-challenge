import CommonAutocomplete from 'common/Autocomplete/Autocomplete';
import HotelsModel from 'models/hotels.model';
import React from 'react';
import handleError from 'src/errors';
import { AutocompleteOptionType } from 'types/common';

const modelInstance = HotelsModel.getInstance();

interface Props {
  onSelected: (key: string, value: string) => void;
}

function CitySearch({ onSelected }: Props) {
  const [options, setOptions] = React.useState([]);

  const handleSelected = (selectedValue: AutocompleteOptionType | null) => {
    if (selectedValue) onSelected('city', selectedValue.label);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const results = await modelInstance.getSearchOptions();
        setOptions(results.cities.map((label: string) => ({ label })));
      } catch (error) {
        handleError(error);
      }
    };

    getData();
  }, []);
  return <CommonAutocomplete options={options} label="City" onSelected={handleSelected} />;
}

export default CitySearch;
