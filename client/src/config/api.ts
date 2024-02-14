const API_URL: string = import.meta.env.VITE_APPLICATION_API;

export const getHeaders = () => {
  const accessToken = localStorage.getItem('sessionToken');
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);
  return headers;
};

export const getJsonHeaders = () => {
  const headersObj: Record<string, string> = {};
  const headers = getHeaders();

  headers.forEach((value, key) => {
    headersObj[key] = value;
  });
  return headersObj;
};

export default API_URL;
