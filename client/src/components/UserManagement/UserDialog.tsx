import DataCard from 'common/DataCard';
import CommonModal from 'common/Modal';
import React from 'react';
import Swal from 'sweetalert2';
import { IUserType } from 'types/users';
import MDBox from 'ui/MDBox';
import MDInput from 'ui/MDInput';
import Roles from './Roles';
import MDButton from 'ui/MDButton';
import PasswordInput from 'common/PasswordInput';
import UserModel from 'src/models/users.model';
import MDTypography from 'ui/MDTypography';
import Checkbox from '@mui/material/Checkbox';
import handleError from 'src/errors';

interface Props {
  showModal: boolean;
  onClose: () => void;
  selected?: IUserType | undefined | null;
}

const initialUser = {
  username: '',
  password: '',
  personName: '',
  email: '',
  roles: [],
  active: true,
};

function ManageUser({ showModal, onClose, selected }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUserType>(selected || initialUser);
  const title = `${selected ? 'Manage' : 'Create New'} User`;
  const modelInstance = UserModel.getInstance();

  const validateEmail = (email: string) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

  const validate = () => {
    const errors: string[] = [];
    const { username, password, personName, email, roles } = user;

    if (username.length <= 3) errors.push('Username must be at least 3 characters long');
    if (!selected) if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (personName?.length === 0) errors.push('Person Name cannot be blank');
    if (!validateEmail(email)) errors.push('Email address is invalid');
    if (roles.length === 0) errors.push('User must have at least 1 role assigned');

    if (errors.length > 0) {
      Swal.fire({
        title: `${title} Error`,
        html: `The following errors were found: <div style="color:red;margin-top:20px">${errors.map(
          (er: string) => '<li>' + er + '</li>',
        )}</div>`,
        icon: 'error',
      });
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newState = { ...user, ...{ [name]: value } };
    setUser(newState);
  };

  const handleCheckChange = () => {
    const newState = { ...user, ...{ active: !user.active } };
    setUser(newState);
  };

  const handleRolesChange = (newValue: string[]) => {
    const newState = { ...user, ...{ roles: newValue } };
    setUser(newState);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = async () => {
    try {
      if (validate()) {
        if (selected) {
          await modelInstance.update(user);
          Swal.fire('User Saved', 'The user was updated', 'success');
        } else {
          await modelInstance.create(user);
          Swal.fire(
            'User Created',
            'The user has been created. They should receive an email with login instructions shortly',
            'success',
          );
        }
        handleClose();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleResetClick = () => {};

  React.useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  React.useEffect(() => {
    if (selected) setUser(selected);
    else setUser(initialUser);
  }, [selected]);

  return (
    <CommonModal
      showModal={open}
      onModalClose={onClose}
      width={300}
      cssOverrides={{ width: 600, bgColor: 'white' }}
      padding={0}
    >
      <MDBox>
        <DataCard title="">
          <MDBox display="flex">
            <MDTypography fontWeight="bold">{title}</MDTypography>
            <MDBox ml="auto" fontSize="0.9rem">
              Active <Checkbox name="active" checked={user.active || false} onChange={handleCheckChange} />
            </MDBox>
          </MDBox>
          <MDBox component="form" onSubmit={handleSubmit} mt={2}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                id="username"
                name="username"
                label="Username"
                value={user.username}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>

            {!selected && (
              <MDBox mb={2}>
                <PasswordInput onChange={(newValue: string) => setUser({ ...user, ...{ password: newValue } })} />
              </MDBox>
            )}

            <MDBox mb={2}>
              <MDInput
                type="text"
                id="personName"
                name="personName"
                label="Person Name"
                value={user.personName}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="text"
                id="email"
                name="email"
                label="Email"
                value={user.email}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>

            <MDBox mb={2}>
              <Roles value={user?.roles} onChange={handleRolesChange} />
            </MDBox>
          </MDBox>
        </DataCard>
        <MDBox display="flex" mt={2}>
          <MDBox>
            <MDButton variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </MDButton>
          </MDBox>
          <MDBox ml={1}>
            <MDButton variant="contained" color="warning" onClick={handleResetClick}>
              Reset Password
            </MDButton>
          </MDBox>
          <MDBox ml={1}>
            <MDButton variant="contained" color="error" ml={2} onClick={handleClose}>
              Cancel
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </CommonModal>
  );
}

export default ManageUser;
