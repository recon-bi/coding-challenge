import { MouseEventHandler, ReactNode } from 'react';
// import { Theme } from "@mui/material/styles";
import MDBox from 'ui/MDBox';
import { useMaterialUIController } from 'context/index';
import Icon from '@mui/material/Icon';

// Declaring props types for DataTableHeadCell
interface Props {
  width?: string | number;
  children: ReactNode;
  sorted?: false | 'none' | 'asc' | 'desc';
  align?: 'left' | 'right' | 'center';
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  column: any;
  onRemoveSort?: () => void;
  onRemoveFilter?: () => void;
}

function DataTableHeadCell({
  width,
  children,
  sorted,
  align,
  onClick,
  column,
  onRemoveSort,
  onRemoveFilter,
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const handleRemoveSort = (e: any) => {
    e.stopPropagation();
    if (onRemoveSort) onRemoveSort();
    column.clearSortBy();
  };
  const handleRemoveFilter = () => {
    if (onRemoveFilter) onRemoveFilter();
    column.setFilter(null);
  };
  return (
    <MDBox component="th" width={width} py={1.5} px={3} onClick={onClick}>
      <MDBox
        position="relative"
        textAlign={align}
        color={darkMode ? 'white' : 'secondary'}
        opacity={0.7}
        sx={{
          fontSize: (Theme) => Theme.typography.size.xxs,
          fontWeight: (Theme) => Theme.typography.fontWeightBold,
          textTransform: 'uppercase',
          cursor: sorted ? 'pointer' : undefined,
          userSelect: sorted ? 'none' : undefined,
          whiteSpace: 'nowrap',
        }}
        display="flex"
      >
        <MDBox>{children}</MDBox>

        {(column.canSort || column.canFilter) && (
          <MDBox
            top={0}
            right={align !== 'right' ? '16px' : 0}
            left={align === 'right' ? '-5px' : 'unset'}
            sx={{
              fontSize: (Theme) => Theme.typography.size.lg,
            }}
            display="flex"
            ml={2}
          >
            <MDBox
              color={sorted === 'asc' ? 'primary' : 'secondary'}
              opacity={sorted === 'asc' ? 1 : 0.5}
              mt={-0.5}
              onClick={column.isSorted ? handleRemoveSort : undefined}
              title="Remove Sorting"
            >
              {column.isSorted ? <Icon>filter_list_off</Icon> : <Icon>filter_list_icon</Icon>}
            </MDBox>

            {column.filterValue && (
              <MDBox
                color={sorted === 'desc' ? 'primary' : 'secondary'}
                opacity={sorted === 'desc' ? 1 : 0.5}
                onClick={handleRemoveFilter}
                title="Remove Filtering"
                mt={-0.5}
              >
                <Icon>filter_alt_off</Icon>
              </MDBox>
            )}
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: 'auto',
  sorted: 'none',
  align: 'left',
  onClick: undefined,
  onRemoveSort: () => {
    // TODO
  },
  onRemoveFilter: () => {
    // TODO
  },
};

export default DataTableHeadCell;
