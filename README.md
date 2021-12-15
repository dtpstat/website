# website

Future frontend of https://dtp-stat.ru written in Next.js.

## Getting Started

```sh
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

```ini
## (optional) Pausing comments
NEXT_PUBLIC_COMMENTS_ARE_PAUSED=true
```

## Authorization configuration

Create file **.env.local** and fill it with information from [Auth0 Application Profile](https://manage.auth0.com/dashboard):

```ini
AUTH0_SECRET=replace-with-your-own-secret-generated-with-openssl
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL='https://{DOMAIN}'
AUTH0_CLIENT_ID='{CLIENT_ID}'
AUTH0_CLIENT_SECRET='{CLIENT_SECRET}'
AUTH0_AUDIENCE=
AUTH0_SCOPE='openid profile'
```
