const _ = require('underscore');
const fetch = require('node-fetch');

const CACHE = {};

module.exports = ({url, key}) => {
  if (!CACHE[url]) CACHE[url] = {};
  if (!CACHE[url][key]) CACHE[url][key] = {index: ''};
  const cache = CACHE[url][key];

  const updateValue = value =>
    _.isEqual(value, cache.value) ? watch() : cache.value = value;

  const watch = () =>
    fetch(`${url}/v1/kv${key}?index=${cache.index}`).then(res => {
      cache.index = res.headers.get('x-consul-index');
      if (res.status === 404) return updateValue(null);

      return res.json().then(([{Value: value}]) =>
        updateValue(JSON.parse(Buffer.from(value, 'base64').toString()))
      );
    });

  return watch();
};
