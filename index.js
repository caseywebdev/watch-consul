const _ = require('underscore');
const fetch = require('node-fetch');

module.exports = ({url, key}, cb) => {
  let index = '';
  let prev;

  const updateValue = value => {
    if (!_.isEqual(value, prev)) cb(prev = value);
    return watch();
  };

  const watch = () =>
    fetch(`${url}/v1/kv${key}?index=${index}`)
      .then(res => {
        index = res.headers.get('x-consul-index');
        return res.status === 404 ? updateValue(null) : res.json();
      })
      .then(([{Value: value}]) =>
        updateValue(JSON.parse(Buffer.from(value, 'base64').toString()))
      );
  return watch();
};
