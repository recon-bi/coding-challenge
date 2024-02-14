const postcodesIoUrl = 'https://api.postcodes.io/postcodes';

export const postCodeLookup = async (postCode: string) => {
  try {
    const reqUrl = `${postcodesIoUrl}/${postCode}`;
    const response = await fetch(reqUrl);
    const { result } = await response.json();
    return result;
  } catch (er: any) {
    console.error(er);
    return er;
  }
};

export default {};
