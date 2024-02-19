import DataTable from 'common/DataTable';
import DashboardLayout from 'layouts/Dashboard';
import DashboardNavbar from 'layouts/Navbar';
import UsersModel from 'src/models/users.model';
import React from 'react';
import { IUserType } from 'types/users';
import MDBox from 'ui/MDBox';
import MDButton from 'ui/MDButton';
import UserDialog from './UserDialog';
import columns from './users.columns';

function Users() {
  const [showCreateUser, setShowCreateUser] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<IUserType | undefined | null>(null);
  const modelInstance = UsersModel.getInstance();

  const handleClick = () => {
    setShowCreateUser(true);
  };

  const handleRowClick = ({ original }: any) => {
    setSelected(original);
    setShowCreateUser(true);
  };

  const handleModalClose = () => {
    setSelected(null);
    setShowCreateUser(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex">
        <MDBox ml="auto">
          <MDButton onClick={handleClick} color="primary">
            Create New
          </MDButton>
        </MDBox>
      </MDBox>

      <MDBox mt={2}>
        <DataTable columns={columns} modelInstance={modelInstance} onRowClick={handleRowClick} />
      </MDBox>
      <UserDialog showModal={showCreateUser} onClose={handleModalClose} selected={selected} />
    </DashboardLayout>
  );
}

export default Users;
