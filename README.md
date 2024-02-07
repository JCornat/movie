# Movie

App to track and rate movies, with todo list

[Demo](https://movie.cornat.co/)

![Capture](https://i.imgur.com/mKWZk9O.png)

# Local installation

This project is divided in two parts :
- the `app` folder for the backend
- the `client` folder for the frontend

## Requirements

- Install Node.js and make sure `node` and `npm` commands are available in your terminal
- Install TypeScript and make sure `tsc` command is available in your terminal
- Install Angular and make sure `ng` command is available in your terminal

## Back-end

- Go to the `app` folder
- Run `npm install`
- Create a file `config.ts` in `app/config` folder
- Here an example of `config.ts` file :
```typescript
import path from 'node:path';

export namespace Config {
  export const MODE: 'development' | 'test' | 'production' = 'development';
  export const PORT: number = 3000;
  export const URL: string = 'https://localhost:3000';
  export const UPLOAD_PATH: string = path.join(__dirname, '..', 'public', 'upload');
  export const IMAGE_PATH: string = path.join(__dirname, '..', 'public', 'image');
  export const UPLOAD_MAX_SIZE: number = 200000000;
  export const MOVIEDB_API_KEY = '';
  export const TOKEN_SIGNATURE: string = '';
  export const TOKEN_EXPIRATION: string = '';
  export const ADMINISTRATOR_LOGIN: string = '';
  export const ADMINISTRATOR_PASSWORD: string = '';
  export const TWITCH_CLIENT = {id: '', secret: ''};
}

```
- Some variables containing an empty string must be filled :
1. `ADMINISTRATOR_USERNAME` and `ADMINISTRATOR_PASSWORD` are the credentials to access the administration panel, and must be hashed with bcrypt
2. `TOKEN_SIGNATURE` is the signature used to sign the JWT token for the authentication. Please generate a LONG random string (at least 128 characters)
3. (Optional) `MOVIEDB_API_KEY` is the API key from [The Movie Database](https://www.themoviedb.org/)
4. (Optional) `TWITCH_CLIENT` is the client ID and secret from [Twitch](https://dev.twitch.tv/)
- Run `tsc` to compile the TypeScript files
- Run `node app.js` to start the server

## Front-end

- Go to the `client` folder
- Run `npm install`
- Create a file `config.ts` in `client/src/app/shared/config` folder
- Here an example of `config.ts` file :
```typescript
export const SERVER_URL = 'http://localhost:3000';
export const TITLE = 'My website';
export const META_TAGS: any[] = [];
```
- Run `npm run start` to start
