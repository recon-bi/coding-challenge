import CommonAutocomplete from 'common/Autocomplete/Autocomplete';
import HotelsModel from 'models/hotels.model';
import React from 'react';
import handleError from 'src/errors';
import { AutocompleteOptionType } from 'types/common';

const modelInstance = HotelsModel.getInstance();

interface Props {
  onSelected: (key: string, value: string) => void;
  initialState?: any[];
}

function CitySearch({ onSelected, initialState = [] }: Props) {
  const [options, setOptions] = React.useState(initialState);

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

  return (
    <CommonAutocomplete
      options={options}
      label="City"
      onSelected={handleSelected}
      sx={{ minWidth: 175 }}
      testid="citySearch_Autocomplete"
    />
  );
}

export default CitySearch;
