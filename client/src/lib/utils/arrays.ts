export function findAndReplaceObject(array: any, newItem: any, identifier?: any) {
  const id = identifier || "_id";
  const index = array.findIndex((x: any) => x[id] === newItem[id]);
  const newArray = array.concat([]);
  if (index >= 0) {
    newArray.splice(index, 1, newItem);
  }
  return newArray;
}

export function findAndMergeObject(data: any, update: any, identifier?: any) {
  const id = identifier || "_id";
  const index = data.findIndex((x: any) => x[id] === update[id]);
  const newData = data.concat([]);
  const updatedItem = { ...data[index], ...update };
  newData.splice(index, 1, updatedItem);
  return newData;
}

export const sortByDate = (a: any, b: any, fieldName: any) =>
  // eslint-disable-next-line no-nested-ternary
  a[fieldName] < b[fieldName] ? -1 : a[fieldName] > b[fieldName] ? 1 : 0;

export const sortByDateDesc = (a: any, b: any, fieldName: any) =>
  // eslint-disable-next-line no-nested-ternary
  a[fieldName] > b[fieldName] ? -1 : a[fieldName] > b[fieldName] ? 1 : 0;

export const sortByName = (a: any, b: any, fieldName: string) => {
  const nameA = a[fieldName].toUpperCase(); // ignore upper and lowercase
  const nameB = b[fieldName].toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
};
