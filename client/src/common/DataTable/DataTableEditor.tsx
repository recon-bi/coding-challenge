import CommonModal from 'common/Modal/Modal';
import React from 'react';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  showModal: boolean;
  selectedItem: any;
  onSave: (savedItem: any) => {};
  columns: any[];
}

function DataTableEditor({ showModal, selectedItem, onSave, columns }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<any>({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (onSave) onSave(selected);
  };

  React.useEffect(() => {
    setOpen(showModal);
    setSelected(selectedItem);
  }, [showModal, selectedItem]);

  return (
    <CommonModal showModal={open} onModalClose={handleClose}>
      <MDBox>
        <MDTypography fontSize="1rem" fontWeight="bold">
          Data Editor
        </MDTypography>
        <MDBox>
          {columns.map((column: any) => {
            return (
              <MDBox display="flex">
                <MDBox>{column.Header}</MDBox>
                <MDBox>{selectedItem[column.accessor]}</MDBox>
              </MDBox>
            );
          })}
        </MDBox>
      </MDBox>
    </CommonModal>
  );
}

export default DataTableEditor;
