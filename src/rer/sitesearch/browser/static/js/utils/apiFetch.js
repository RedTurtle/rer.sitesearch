/* eslint-disable no-prototype-builtins */
import axios from 'axios';
import qs from 'query-string';

// This is hell, Flex Tape'd it, no time to rewrite something that
// I'am told is "used in production and working".
// For more info: https://www.youtube.com/watch?v=0xzN6FM5x_E
// Added some checks in case some dotted query is used for some reason
// in filters components, remove if necessary
export const dotify = params => {
  var res = {};
  function recurse(obj, current) {
    for (var key in obj) {
      var value = obj[key];
      if (
        key === 'b_start' &&
        typeof value === 'object' &&
        value.hasOwnProperty('query')
      ) {
        res[key] = value?.query;
        continue;
      }
      var newKey = current ? current : key; // joined key with dot . NO. MORE
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        recurse(value, newKey); // it's a nested object, so do it again. Skip if is an array
      } else {
        res[newKey] = value; // it's not an object, so set the property
      }
    }
  }

  recurse(params);
  return res;
};
const metadata_fields = [
  'modified',
  'Subject',
  'scadenza_bando',
  'effective',
  'path',
  'path_depth',
  'argomento',
  'settore',
];

export const updateHistory = ({ url, params }) => {
  const searchParams = qs.stringify(dotify(params), {
    skipNull: true,
    skipEmptyString: true,
  });
  window.history.pushState({}, '', `${url}?${searchParams}`);
};

const apiFetch = ({ url, params, method }) => {
  if (!method) {
    method = 'GET';
  }
  var headers = { Accept: 'application/json' };
  const parsedQuery = params ? dotify({ ...params, metadata_fields }) : null;
  return axios({
    method,
    url,
    params: parsedQuery,
    paramsSerializer: params =>
      qs.stringify(params, { skipNull: true, skipEmptyString: true }),
    headers,
  }).catch(function(error) {
    // handle error
    console.error(error);
  });
};

export default apiFetch;
