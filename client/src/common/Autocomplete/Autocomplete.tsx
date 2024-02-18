import Autocomplete, { AutocompleteChangeReason, AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { sortByName } from 'lib/utils/arrays';
import React from 'react';
import { AutocompleteOptionType } from 'types/common';
import MDBox from 'ui/MDBox';
import MDInput from 'ui/MDInput';

interface Props {
  onChange?: (value: NonNullable<string | AutocompleteOptionType>) => void;
  onSelected?: (selectedValue: AutocompleteOptionType | null) => void;
  onClear?: () => void;
  label?: string;
  options?: AutocompleteOptionType[];
  selectedValue?: any;
  name?: string;
  width?: number;
  sortDesc?: boolean;
  [key: string]: any;
}

function CommonAutocomplete({
  onChange,
  onSelected,
  onClear,
  label,
  options,
  selectedValue,
  name,
  width,
  sortDesc,
  ...rest
}: Props) {
  const [sortedOptions, setSortedOptions] = React.useState<AutocompleteOptionType[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (
    e: any,
    newValue: NonNullable<string | AutocompleteOptionType>,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (reason === 'clear') {
      console.log('Cleared for a reason');
    }
    if (onChange) onChange(newValue);
  };

  const handleChange = (e: any, newValue: AutocompleteOptionType | null, reason: AutocompleteChangeReason) => {
    if (onSelected) onSelected(newValue);
  };

  React.useEffect(() => {
    if (options && options.length > 1) {
      const sortField = options?.some((option: AutocompleteOptionType) => option?.group) ? 'group' : 'label';
      setSortedOptions(
        options.sort((a: AutocompleteOptionType, b: AutocompleteOptionType) =>
          sortDesc ? sortByName(b, a, sortField) : sortByName(a, b, sortField),
        ),
      );
    }
  }, [options]);

  return (
    <MDBox spacing={2} sx={{ maxWidth: width }} bgColor="white" borderRadius="10px">
      <Autocomplete
        data-testid="date-range-picker"
        id="common-autocomplete"
        options={sortedOptions}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        onChange={handleChange}
        groupBy={(option: any) => (option?.group ? option.group : null)}
        getOptionLabel={(option: any) => option.label}
        renderInput={(params) => (
          <MDInput
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              sx: { backgroundColor: 'white', height: 45, maxWidth: width, lineHeight: 0 },
            }}
            name={name}
            value={selectedValue}
          />
        )}
        {...rest}
      />
    </MDBox>
  );
}

CommonAutocomplete.defaultProps = {
  label: 'Search Input',
  options: [],
  selectedValue: '',
  width: 300,
  sortDesc: false,
};

export default CommonAutocomplete;
