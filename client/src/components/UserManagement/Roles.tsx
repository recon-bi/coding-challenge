import UsersModel from 'src/models/users.model';
import React from 'react';
import { RoleType } from 'types/users';
import MDBox from 'ui/MDBox';
import { Alert, AlertColor, Checkbox } from '@mui/material';
import MDTypography from 'ui/MDTypography';

interface Props {
  onChange?: (selected: string[]) => void;
  value: string[];
}

function Roles({ onChange, value }: Props) {
  const [options, setOptions] = React.useState<RoleType[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const roleColors: AlertColor[] = ['error', 'warning', 'info', 'success'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (selectedOptions.includes(name)) return;
    const newSelection = checked ? [...selectedOptions, name] : selectedOptions.filter((x: string) => x !== name);
    setSelectedOptions(newSelection);
    if (onChange) onChange(newSelection);
  };

  React.useEffect(() => {
    const getData = async () => {
      const modelInstance = UsersModel.getInstance();
      const roles = await modelInstance.getRoles();
      setOptions(roles);
    };
    getData();
  }, []);

  return (
    <MDBox>
      <MDTypography variant="h6">User Roles</MDTypography>
      <MDBox borderRadius="10px">
        {options.map(({ role, description }, index) => (
          <MDBox key={`role_${index}`}>
            <Alert severity={roleColors[index]} icon={false} sx={{ marginTop: '5px' }}>
              <MDBox display="flex">
                <MDBox>
                  <Checkbox onChange={handleChange} name={role} checked={value?.includes(role)} />
                </MDBox>
                <MDBox mt={0.75} ml={1}>
                  <MDTypography fontSize="1rem" fontWeight={600}>
                    <b>{role}</b>
                    <br /> {description}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Alert>
          </MDBox>
        ))}
      </MDBox>
    </MDBox>
  );
}

export default Roles;
