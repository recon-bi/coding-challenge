export const _chartColors: string[] = [
  '#01a2ca',
  '#2003fe',
  '#f16304',
  '#ff0000',
  '#747474',
  '#048417',
  '#c0018d',
  '#690303',
  '#007573',
  '#9c79ff',
];

export const chartHexColors: string[] = [
  '#01a2ca',
  '#2003fe',
  '#f16304',
  '#ff0000',
  '#747474',
  '#048417',
  '#c0018d',
  '#690303',
  '#007573',
  '#9c79ff',
  '#177d96',
  '#21186b',
  '#5f3c25',
  '#572323',
  '#303030',
  '#17371c',
  '#ff8ce2',
  '#3b1e1e',
  '#2e4f4e',
  '#040405',
];

export const chartColors: string[] = ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark'];

export const statusColors = [
  { statusType: 'quote', status: 'Active', color: 'success' },
  { statusType: 'quote', status: 'Booked', color: 'info' },
  { statusType: 'quote', status: 'Cancelled', color: 'error' },
  { statusType: 'quote', status: 'Expired', color: 'secondary' },
];

export const getStatusColor = (status: string, statusType?: string) => {
  const filteredStatus = statusColors.filter((x) => x.statusType === statusType);
  const selectedStatus = filteredStatus.find((x) => x.status === status);
  return selectedStatus?.color;
};

export const getProbabilityColor = (probability: number) => {
  if (probability < 0.6) return 'success';
  if (probability < 0.8) return 'warning';
  return 'error';
};

export default {};
