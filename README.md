# watch-consul

A simple utility for watching a JSON key on a consul server and triggering a
callback initially and whenever a change occurs.

```js
import watchConsul from 'watch-consul';

watchConsul({
  url: 'my-consul-server:8500',
  key: '/my/key/to/watch',
}, value => console.log(value)).catch(er => console.error(er));
```
