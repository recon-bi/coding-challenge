export const getRandomArbitrary = (min: number, max: number, round = false) => {
  const value = Math.random() * (max - min) + min
  return round ? Number(value).toFixed(0) : value
}