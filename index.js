const _ = require('underscore');
const fetch = require('node-fetch');

module.exports = ({url, key}, cb) => {
  let index = '';
  let prev;
  const watch = () =>
    fetch(`${url}/v1/kv${key}?index=${index}`)
      .then(res => {
        index = res.headers.get('x-consul-index');
        return res.json();
      })
      .then(([{Value: next}]) => {
        next = JSON.parse(Buffer.from(next, 'base64').toString());
        if (!_.isEqual(next, prev)) cb(prev = next);
        return watch();
      });
  return watch();
};
