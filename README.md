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

### Content management

```ini
## (optional) Pausing comments
COMMENTS_ARE_PAUSED=true
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
    This variable is automatically configured for Netlify deployments via [`prepare-netlify-dotenv.mjs`](prepare-netlify-dotenv.mjs).

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

### Error tracking

This app uses [Sentry](https://sentry.io) to track runtime errors both on client and server.
Error reporting is disabled by default.
For it to work for a deployment, configure these variables _before_ running `yarn build`.

```ini
SENTRY_AUTH_TOKEN=...
SENTRY_DSN=https://...
SENTRY_ENVIRONMENT={production | staging | ...}
```

## Contributing

[How to contribute](https://github.com/github/docs/blob/main/CONTRIBUTING.md)
