# watch-consul

A simple utility for watching a JSON key on a consul server and triggering a
callback initially and whenever a change occurs.

```js
import watchConsul from 'watch-consul';

const watch = () =>
  watchConsul({url: 'my-consul-server:8500', key: '/my/key/to/watch'})
    .then(console.log.bind(console))
    .catch(console.error.bind(console))
    .then(watch);

watch();
```
