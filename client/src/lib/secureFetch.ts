import { getHeaders } from 'config/api';
import { handleFailure } from 'lib/handleFetchError';

export const useFetch = async (url: string, fetchOptions?: any, onFailure=handleFailure) => {
  const options = {...{ headers: getHeaders(), credentials: 'include' }, ...fetchOptions}

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 403) {
        onFailure();
      }
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
