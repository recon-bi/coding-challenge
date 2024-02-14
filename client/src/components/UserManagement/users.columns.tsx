import ActiveCircle from 'common/ActiveCircle';

const columns = [
  {
    Header: 'Username',
    accessor: 'username',
  },
  {
    Header: 'Person name',
    accessor: 'personName',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Roles',
    accessor: 'roles',
    Cell: ({ cell: { value } }: any) => (value ? value.map((v: string) => v) : null),
  },
  {
    Header: 'Active',
    accessor: 'active',
    Cell: ({ cell: { value } }: any) => <ActiveCircle active={value} />,
  },
];

export default columns;
