/* eslint-disable import/prefer-default-export */
export function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
export function formatString(str: string) {
  // Replace underscores with spaces
  const stringWithSpaces = str.replace(/_/g, " ");

  // Capitalize the first letter of each word
  const formattedString = stringWithSpaces.replace(/\b\w/g, (match) => match.toUpperCase());

  return formattedString;
}
