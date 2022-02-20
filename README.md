# DTP-STAT

Future frontend of https://dtp-stat.ru written in Next.js.

## Getting Started

1.  Install dependencies:

    ```shell
    yarn install
    ```

1.  Create a file named `.env.local` and fill it with environment variables listed in the next section.

1.  Generate Prisma typings:

    ```shell
    yarn prisma generate
    ```

1.  Run Next.js in dev mode:

    ```shell
    yarn dev
    ```

1.  Open [localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment variables

All secrets should never be committed to the git repo, but saved in the environment variables.

### Transition from Django

Classic version of `dtp-stat.ru` runs on [Django framework](https://www.djangoproject.com).
Its source is stored in [dtpstat/dtp-stat](https://github.com/dtpstat/dtp-stat) _(internal link)_.
While we transition to Next.js, we still need Django app to serve API requests and missing pages.

```ini
DJANGO_BASE_URL={url}
DJANGO_CONTENT_FALLBACK={true | false}
```

Enabling `DJANGO_CONTENT_FALLBACK` makes Next.js route all non-existing resources to Django.
This enables incremental adoption of Next.js, allowing us to convert pages to React one by one.
See `next.config.mjs` → `rewrites` for implementation details.

### Content management

```ini
COMMENTS_ARE_PAUSED={true | false}
```

### Error tracking

This app uses [Sentry](https://sentry.io) to track runtime errors both on client and server.
Error reporting is disabled by default.
For it to work for a deployment, configure these variables _before_ running `yarn build`.

```ini
SENTRY_AUTH_TOKEN={token}
SENTRY_DSN={url}
SENTRY_ENVIRONMENT={production | staging | ...}
```

### Authorization with auth0

1.  Create new application on the [auth0](https://manage.auth0.com)

1.  Go to the auth0 application configuration page

1.  Set Application URIs.

    Values below are for local development on `http://localhost:3000` and deployments to `https://dtp-map.netlify.app` / `https://*--dtp-map.netlify.app`.

    ***

    Allowed Callback URLs:

    `http://localhost:3000/api/auth/callback, https://dtp-map.netlify.app/api/auth/callback, https://*--dtp-map.netlify.app/api/auth/callback`

    Allowed Logout URLs:

    `http://localhost:3000, https://dtp-map.netlify.app, https://*--dtp-map.netlify.app`

    Allowed Web Origins:

    `http://localhost:3000, https://dtp-map.netlify.app, https://*--dtp-map.netlify.app`

    ***

1.  Get the auth0 application values: `DOMAIN`, `CLIENT_ID`, `CLIENT_SECRET`

1.  Define these environment variables in `.env.local`, Netlify UI, etc.:

    ```ini
    AUTH0_CLIENT_ID={client-id}
    AUTH0_CLIENT_SECRET={client-secret}
    AUTH0_ISSUER_BASE_URL={url}
    AUTH0_SECRET={secret}
    ```

    For local development you will also need to set `AUTH0_BASE_URL=http://localhost:3000`.
    This variable is automatically configured for Netlify deployments via [`build-on-netlify.mjs`](build-on-netlify.mjs).

### Database Configuration

1.  Create any [prisma-supported database](https://www.prisma.io/docs/concepts/overview) any localhost or online (tested with [Heroku/PostgreSQL](https://www.heroku.com/postgres)).

1.  Define this environment variable in `.env.local`, Netlify UI, etc.:

    ```ini
    DATABASE_URL="postgres://{user}:{password}@{host}:{port}/{db}"
    ```

## Database Schema Update

Initial apply of the db schema:

```shell
yarn prisma generate
yarn prisma db push
```

On every change of the file **schema.prisma** please run:

```shell
yarn prisma db push
```

On every change of the raw database schema please run:

```shell
yarn prisma db pull
```

## Contributing

[How to contribute](https://github.com/github/docs/blob/main/CONTRIBUTING.md)
