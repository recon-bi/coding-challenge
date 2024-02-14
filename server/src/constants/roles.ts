const ROLES = [
  { role: 'AppAdmin', description: 'Grants access to all areas of the site, including user management' },
  { role: 'DataManager', description: 'Grants read/write access to the pricing database and tables' },
  { role: 'Agent', description: 'Grants read/write access to quotes and dashboard stats for the individual user' },
  { role: 'Manager', description: 'Grants read/write access to quotes and dashboard stats for ALL users' },
];

export default ROLES;
