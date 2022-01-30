# DTP-STAT

Future frontend of https://dtp-stat.ru written in Next.js.

## Getting Started

```sh
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

All secrets should never be committed to the git repo, but saved in the environment variables.

### Content management

```ini
## (optional) Pausing comments
COMMENTS_ARE_PAUSED=true
```

### Authorization with auth0

Example for local development on the host **http://localhost:3000** and staging server **https://1--dtp-map.netlify.app**.

1.  Create new application on the [auth0](https://manage.auth0.com/)

1.  Go to the auth0 application configuration page

1.  Set Application URIs:

    ***

    Allowed Callback URLs:

    `http://localhost:3000/api/auth/callback, https://*--dtp-map.netlify.app/api/auth/callback`

    Allowed Logout URLs:

    `http://localhost:3000, https://*--dtp-map.netlify.app/`

    Allowed Web Origins:

    `http://localhost:3000, https://*--dtp-map.netlify.app/`

    ***

1.  Get the auth0 application values: **DOMAIN, CLIENT_ID, CLIENT_SECRET**

1.  Create file **.env.local** with the following contents:

    ```ini
    AUTH0_BASE_URL=http://localhost:3000
    AUTH0_CLIENT_ID={client-id}
    AUTH0_CLIENT_SECRET={client-secret}
    AUTH0_ISSUER_BASE_URL=https://{domain}
    AUTH0_SECRET={secret}
    
    DATABASE_URL="postgres://{user}:{password}@{host}:{port}/{db}"
    ```

### Database Configuration

1.  Create any [prisma-supported database](https://www.prisma.io/docs/concepts/overview) any localhost or online (tested with [Heroku/PostgreSQL](https://www.heroku.com/postgres)).

1.  Update file **.env.local** with database url information:

```ini
DATABASE_URL="postgres://user:password@host:5432/db"
```

## Database Schema Update

Initial apply of the db schema:

```sh
yarn prisma generate
yarn prisma db push
```

On every change of the file **schema.prisma** please run:

```sh
yarn prisma db push
```

On every change of the raw database schema please run:

```sh
yarn prisma db pull
```

### Error tracking

This app uses [Sentry](https://sentry.io) to track runtime errors both on client and server.
Error reporting is disabled by default.
For it to work for a deployment, configure these variables _before_ running `yarn build`.

```ini
SENTRY_AUTH_TOKEN=...
SENTRY_DSN=https://...
SENTRY_ENVIRONMENT=production/staging/...
```

## Contributing

[How to contribute](https://github.com/github/docs/blob/main/CONTRIBUTING.md)
