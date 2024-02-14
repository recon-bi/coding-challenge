import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { AutocompleteCloseReason } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import MDInput from 'ui/MDInput';
import StyledPopper from './StyledPopper';
import StyledAutocompletePopper from './StyledAutocompletePopper';
import StyledInput from './StyledInput';
import { AutocompleteCheckboxOptionType, AutocompleteOptionType } from 'types/common';

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

interface LabelType {
  name: string;
  color: string;
  description?: string;
}

interface AutocompleteCheckboxProps {
  items?: AutocompleteCheckboxOptionType[];
  onChange?: Function;
  onClick?: Function;
  title?: string;
  label?: string;
  width?: number | string;
  showList?: boolean;
  selectedValues?: AutocompleteCheckboxOptionType[];
  filterPlaceholder?: string;
}

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

PopperComponent.defaultProps = {
  anchorEl: null,
  disablePortal: false,
};

function AutocompleteCheckbox({
  items,
  onClick,
  onChange,
  title,
  label,
  width,
  showList,
  selectedValues,
  filterPlaceholder,
}: AutocompleteCheckboxProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<AutocompleteCheckboxOptionType[]>([]);
  const [pendingValue, setPendingValue] = React.useState<AutocompleteCheckboxOptionType[]>([]);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (selectedValues && selectedValues.length > 0) setValue(selectedValues);
  }, [selectedValues]);

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <>
      <Box>
        <MDInput onClick={handleClick} label={label} value={value.length > 0 ? `${value.length} selected` : ''} />
        {showList &&
          value.map((label) => (
            <Box
              key={label.name}
              sx={{
                mt: '3px',
                height: 20,
                padding: '.15em 4px',
                fontWeight: 600,
                lineHeight: '15px',
                borderRadius: '2px',
              }}
              style={{
                backgroundColor: label.color,
                color: theme.palette.getContrastText(label.color),
              }}
            >
              {label.name}
            </Box>
          ))}
      </Box>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {title && (
              <Box
                sx={{
                  borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
                  padding: '8px 10px',
                  fontWeight: 600,
                }}
              >
                {title}
              </Box>
            )}
            <Autocomplete
              open
              multiple
              onClose={(event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (onChange) onChange(newValue);
                if (onClick) onClick(newValue);
                if (
                  event.type === 'keydown' &&
                  (event as React.KeyboardEvent).key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                // @ts-ignore
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: '3px',
                      mr: 1,
                      mt: '2px',
                    }}
                    style={{ backgroundColor: option.color }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      '& span': {
                        color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                      },
                    }}
                  >
                    {option.name}
                    <br />
                    <span>{option.description}</span>
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                </li>
              )}
              options={[...items].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + items.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + items.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option: any) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </>
  );
}

AutocompleteCheckbox.defaultProps = {
  items: [],
  onChange: () => {},
  onClick: () => {},
  title: null,
  label: 'Select some',
  showList: false,
  filterPlaceholder: 'Filter Results',
};

export default AutocompleteCheckbox;

// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import CloseIcon from '@mui/icons-material/Close';
// import DoneIcon from '@mui/icons-material/Done';
// import Autocomplete, { AutocompleteCloseReason } from '@mui/material/Autocomplete';
// import Box from '@mui/material/Box';
// import MDInput from 'ui/MDInput';
// import StyledPopper from './StyledPopper';
// import StyledAutocompletePopper from './StyledAutocompletePopper';
// import StyledInput from './StyledInput';

// interface PopperComponentProps {
//   anchorEl?: any;
//   disablePortal?: boolean;
//   open: boolean;
// }

// interface LabelType {
//   name: string;
//   color: string;
//   description?: string;
// }

// interface AutocompleteCheckboxProps {
//   items?: LabelType[];
//   onChange?: (newValue: any[]) => void;
//   onClick?: (newValue: any[]) => void;
//   title?: string;
//   label?: string;
//   showList?: boolean;
//   width?: number | string;
//   filterPlaceholder?: string;
//   showFilter: boolean;
// }

// function PopperComponent(props: PopperComponentProps) {
//   const { disablePortal, anchorEl, open, ...other } = props;
//   console.log({ other });
//   return <StyledAutocompletePopper {...other} />;
// }

// PopperComponent.defaultProps = {
//   anchorEl: null,
//   disablePortal: false,
// };

// function AutocompleteCheckbox({
//   items,
//   onClick,
//   onChange,
//   title,
//   label,
//   showList,
//   width,
//   filterPlaceholder,
//   showFilter,
// }: AutocompleteCheckboxProps) {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const theme = useTheme();
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     if (anchorEl) {
//       anchorEl.focus();
//     }
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'github-label' : undefined;

//   return (
//     <>
//       <Box sx={{ width, fontSize: 13 }}>
//         <MDInput
//           margin="dense"
//           onClick={handleClick}
//           label={label}
//           value={propValue.length > 0 ? `${propValue.length} selected` : ''}
//           sx={{ width: '100%' }}
//           inputProps={{
//             autoComplete: 'off',
//           }}
//         />
//         {showList &&
//           propValue.map((item: any) => (
//             <Box
//               key={item.name}
//               sx={{
//                 mt: '3px',
//                 height: 20,
//                 padding: '.15em 4px',
//                 fontWeight: 600,
//                 lineHeight: '15px',
//                 borderRadius: '2px',
//               }}
//               style={{
//                 backgroundColor: item.color,
//                 color: theme.palette.getContrastText(item.color),
//               }}
//             >
//               {item.name}
//             </Box>
//           ))}
//       </Box>
//       <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
//         <ClickAwayListener onClickAway={handleClose}>
//           <div>
//             {title && (
//               <Box
//                 sx={{
//                   borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
//                   padding: '8px 10px',
//                   fontWeight: 600,
//                 }}
//               >
//                 {title}
//               </Box>
//             )}
//             <Autocomplete
//               open
//               multiple
//               onClose={(event: React.ChangeEvent<object>, reason: AutocompleteCloseReason) => {
//                 if (reason === 'escape') {
//                   handleClose();
//                 }
//               }}
//               value={propValue}
//               isOptionEqualToValue={(option, value) => option?.name === value}
//               onChange={(event, newValue, reason) => {
//                 console.log(newValue);
//                 if (onChange) onChange(newValue);
//                 if (onClick) onClick(newValue);
//                 if (
//                   event.type === 'keydown' &&
//                   (event as React.KeyboardEvent).key === 'Backspace' &&
//                   reason === 'removeOption'
//                 ) {
//                   return;
//                 }
//               }}
//               disableCloseOnSelect
//               PopperComponent={PopperComponent}
//               renderTags={() => null}
//               noOptionsText="No labels"
//               renderOption={(props, option, { selected }) => {
//                 console.log('render option', props);
//                 return (
//                   <li {...props}>
//                     <Box
//                       component={DoneIcon}
//                       sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
//                       style={{
//                         visibility: selected ? 'visible' : 'hidden',
//                       }}
//                     />
//                     <Box
//                       component="span"
//                       sx={{
//                         width: 14,
//                         height: 14,
//                         flexShrink: 0,
//                         borderRadius: '3px',
//                         mr: 1,
//                         mt: '4px',
//                       }}
//                       style={{ backgroundColor: option.color }}
//                     />
//                     <Box
//                       sx={{
//                         flexGrow: 1,
//                         '& span': {
//                           color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
//                         },
//                       }}
//                     >
//                       {option.name}
//                       <br />
//                       <span>{option.description}</span>
//                     </Box>
//                     <Box
//                       component={CloseIcon}
//                       sx={{ opacity: 0.6, width: 18, height: 18 }}
//                       style={{
//                         visibility: selected ? 'visible' : 'hidden',
//                       }}
//                     />
//                   </li>
//                 );
//               }}
//               options={
//                 items
//                   ? [...items].sort((a, b) => {
//                       // Display the selected labels first.
//                       let ai = propValue.indexOf(a);
//                       ai = ai === -1 ? propValue.length + items.indexOf(a) : ai;
//                       let bi = propValue.indexOf(b);
//                       bi = bi === -1 ? propValue.length + items.indexOf(b) : bi;
//                       return ai - bi;
//                     })
//                   : []
//               }
//               getOptionLabel={(option: any) => option.name}
//               renderInput={(params) => {
//                 console.log(params);
//                 return showFilter ? (
//                   <StyledInput
//                     ref={params.InputProps.ref}
//                     inputProps={params.inputProps}
//                     // autoFocus
//                     placeholder={filterPlaceholder}
//                     autoComplete="off"
//                   />
//                 ) : (
//                   <MDInput ref={params.InputProps.ref} inputProps={{ ...params.inputProps }}></MDInput>
//                 );
//               }}
//             />
//           </div>
//         </ClickAwayListener>
//       </StyledPopper>
//     </>
//   );
// }

// AutocompleteCheckbox.defaultProps = {
//   items: [],
//   title: null,
//   label: 'Select some',
//   showList: false,
//   width: 221,
//   filterPlaceholder: 'Type to filter',
//   showFilter: false,
// };

// export default AutocompleteCheckbox;
