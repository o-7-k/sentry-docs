---
name: Next.js
doc_link: https://docs.sentry.io/platforms/javascript/guides/nextjs/
support_level: production
type: framework
---

## Install

Configure your app automatically with [Sentry wizard](https://docs.sentry.io/platforms/javascript/guides/nextjs/#configure).

```bash
npx @sentry/wizard -i nextjs
```

## Configure

Sentry wizard will automatically patch your application:

- create `sentry.client.config.js` and `sentry.server.config.js` with the default `Sentry.init`.
- create `next.config.js` with the default configuration.
- create `sentry.properties` with configuration for sentry-cli (which is used when automatically uploading source maps).

You can also [configure it manually](https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/).

Configure the Sentry initialization:

Install Sentry’s Next.js SDK using either `yarn` or `npm`:

```bash
yarn add @sentry/nextjs
# or
npm install --save @sentry/nextjs
```

```javascript
Sentry.init({
  dsn: '___PUBLIC_DSN___',
  integrations: [new Sentry.Replay()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
```

## Verify

This snippet contains an intentional error and can be used as a test to make sure that everything's working as expected.

```javascript
return <button onClick={() => methodDoesNotExist()}>Break the world</button>;
```

---

## Next Steps

- [Source Maps](https://docs.sentry.io/platforms/javascript/guides/nextjs/sourcemaps/): Learn how to enable readable stack traces in your Sentry errors.
- [Next.js Features](https://docs.sentry.io/platforms/javascript/guides/nextjs/features/): Learn about our first class integration with the Next.js framework.
- [Performance Monitoring](https://docs.sentry.io/platforms/javascript/guides/nextjs/performance/): Track down transactions to connect the dots between 10-second page loads and poor-performing API calls or slow database queries.
