---
name: Vue
doc_link: https://docs.sentry.io/platforms/javascript/guides/vue/
support_level: production
type: framework
---

## Install

Sentry captures data by using an SDK within your application’s runtime.

```bash
# Using yarn
yarn add @sentry/vue

# Using npm
npm install --save @sentry/vue
```

## Configure

Initialize Sentry as early as possible in your application's lifecycle.

#### Vue 2

```javascript
import Vue from "vue";
import Router from "vue-router";
import * as Sentry from "@sentry/vue";

Vue.use(Router);

const router = new Router({
  // ...
});

Sentry.init({
  Vue,
  dsn: "___PUBLIC_DSN___",
});

// ...

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
```

#### Vue 3

```javascript
import { createApp } from "vue";
import { createRouter } from "vue-router";
import * as Sentry from "@sentry/vue";

const app = createApp({
  // ...
});
const router = createRouter({
  // ...
});

Sentry.init({
  app,
  dsn: "___PUBLIC_DSN___",
});

app.use(router);
app.mount("#app");
```

## Verify

This snippet contains an intentional error and can be used as a test to make sure that everything's working as expected.

```javascript
myUndefinedFunction();
```

---

## Next Steps

- [Source Maps](https://docs.sentry.io/platforms/javascript/guides/vue/sourcemaps/): Learn how to enable readable stack traces in your Sentry errors.
- [Vue Features](https://docs.sentry.io/platforms/javascript/guides/vue/features/): Learn about our first class integration with the Vue framework.
- [Performance Monitoring](https://docs.sentry.io/platforms/javascript/guides/vue/performance/): Track down transactions to connect the dots between 10-second page loads and poor-performing API calls or slow database queries.
- [Session Replay](https://docs.sentry.io/platforms/javascript/guides/vue/session-replay/): Get to the root cause of an error or latency issue faster by seeing all the technical details related to that issue in one visual replay on your web application.
