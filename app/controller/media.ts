import { Hono } from 'hono';
import { Context } from 'hono/context.ts';
import { Token } from '@model/token.ts';
import { Authentication } from '@model/authentication.ts';
import { game } from '@model/game.ts';
import { movie } from '@model/movie.ts';
import { serie } from '@model/serie.ts';

export namespace MediaController {
  export const router = new Hono();

  function getMedia(media: string): any {
    switch (media) {
      case 'game':
        return game;
      case 'movie':
        return movie;
      case 'serie':
        return serie;
      default:
        throw {status: 400, method: 'Media.getMedia', message: `Paramètres invalides`};
    }
  }

  router.get('/:media{game|movie|serie}', async (c: Context) => {
    const media = getMedia(c.req.param('media'));
    const search = c.req.query('search');
    const token = Token.getAccessToken(c.req);

    let data;
    if (search) {
      Token.verify(token);
      data = await media.search(search);
    } else {
      data = await media.getAll();
    }

    return c.json({data});
  });

  router.get('/:media{game|movie|serie}/:id', Authentication.isLogged(), async (c: Context) => {
    const media = getMedia(c.req.param('media'));
    const id = c.req.param('id');

    const data = await media.getOne(id);
    return c.json({data});
  });

  router.get('/:media{game|movie|serie}/:id/import', Authentication.isLogged(), async (c: Context) => {
    const media = getMedia(c.req.param('media'));
    const id = c.req.param('id');

    const data = await media.importOne(id);
    return c.json({data});
  });

  router.put('/:media{game|movie|serie}/:id', Authentication.isLogged(), async (c: Context) => {
    const media = getMedia(c.req.param('media'));
    const id = c.req.param('id');
    const body = await c.req.json();
    const options = {
      ...body,
      id,
    };

    await media.update(id, options);
    return c.json({status: 200});
  });

  router.post('/:media{game|movie|serie}', Authentication.isLogged(), async (c: Context) => {
    const media = getMedia(c.req.param('media'));
    const body = await c.req.json();

    const data = await media.add(body);
    return c.json({data});
  });

  router.delete('/:media{game|movie|serie}/:id', Authentication.isLogged(), async (c: Context) => {
    const media = getMedia(c.req.param('media'));
    const id = c.req.param('id');

    await media.remove(id);
    return c.json({status: 200});
  });
}
