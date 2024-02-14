import React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';
import { SortByAlpha } from '@mui/icons-material';
import MDButton from 'ui/MDButton';

interface Props {
  column: any;
  filterState: {
    anchorEl: HTMLButtonElement | null;
    name: string;
  };
  onColumnSortChange: (value: any) => void;
}

export default function DataTableFilterSort({ column, filterState, onColumnSortChange }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSort = (desc: boolean) => {
    const { id } = column;
    const sortBy = { id, desc };
    onColumnSortChange(sortBy);
    column.toggleSortBy(desc);
  };

  React.useEffect(() => {
    if (filterState?.name === column.id) {
      setAnchorEl(filterState.anchorEl);
      setOpen(true);
    }
  }, [filterState]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <MDBox p={1}>
                <MDBox>
                  <MDButton size="small" startIcon={<SortByAlpha />} onClick={() => handleSort(false)}>
                    Sort A to Z
                  </MDButton>
                </MDBox>
                <MDBox>
                  <MDButton size="small" startIcon={<SortByAlpha />} onClick={() => handleSort(true)}>
                    Sort Z to A
                  </MDButton>
                </MDBox>
                {column.canFilter && (
                  <>
                    <MDBox p={0}>
                      <MDTypography variant="caption">Filter:</MDTypography>
                    </MDBox>
                    <MDBox mt={-1}>{column.render('Filter')}</MDBox>{' '}
                  </>
                )}
              </MDBox>
            </Paper>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );
}
