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

function CountrySearch({ onSelected, initialState = [] }: Props) {
  const [options, setOptions] = React.useState(initialState);

  const handleSelected = (selectedValue: AutocompleteOptionType | null) => {
    if (selectedValue) onSelected('country', selectedValue.label);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const results = await modelInstance.getSearchOptions();
        setOptions(results.map((label: string) => ({ label })));
      } catch (error) {
        handleError(error);
      }
    };
    getData();
  }, []);

  return (
    <CommonAutocomplete
      options={options}
      label="Country"
      onSelected={handleSelected}
      sx={{ minWidth: 175 }}
      testid="countrySearch_Autocomplete"
    />
  );
}

export default CountrySearch;
