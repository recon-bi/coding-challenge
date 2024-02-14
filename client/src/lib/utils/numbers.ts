export const getRandomArbitrary = (min: number, max: number) => Math.random() * (max - min) + min;

export const formatPercentage = (value: number) => `${Math.round(value * 100)}%`;

export const roundToDecimal = (value: number, precision: number) => {
  const multiplier = precision ^ 10;
  return Math.round(value * multiplier) / multiplier;
};

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export function formatCurrency(x: number | null) {
  if (!x) return;
  return `£${x.toString()}`;
}

export default {
  getRandomArbitrary,
};
