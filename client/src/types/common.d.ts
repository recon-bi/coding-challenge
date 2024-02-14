export type CheckboxMenuItemType = {
  value?: any;
  label: string; // The display name of the item
  checked?: boolean; // The default checked value
  disabled?: boolean;
};

export type SelectOptionsType = {
  value?: any;
  label: string;
};

export type AutocompleteCheckboxOptionType = {
  name: string;
  color: string;
  description?: string;
};

export type AutocompleteOptionType = {
  label: string;
  group?: string;
  value?: string;
};

export type AutocompleteFieldMapType = {
  fieldName: string;
  propertyName: string;
};

export type ScrollableFieldType = {
  displayName: string;
  fieldName: string;
  containerProps: any;
};
