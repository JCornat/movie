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

  router.get('/:media{game|movie|serie}', async (context: Context) => {
    const media = getMedia(context.req.param('media'));
    const search = context.req.query('search');
    const token = Token.getAccessToken(context.req);

    let data;
    if (search) {
      Token.verify(token);
      data = await media.search(search);
    } else {
      data = await media.getAll();
    }

    return context.json({data});
  });

  router.get('/:media{game|movie|serie}/:id', Authentication.isLogged(), async (context: Context) => {
    const media = getMedia(context.req.param('media'));
    const id = context.req.param('id');

    const data = await media.getOne(id);
    return context.json({data});
  });

  router.get('/:media{game|movie|serie}/:id/import', Authentication.isLogged(), async (context: Context) => {
    const media = getMedia(context.req.param('media'));
    const id = context.req.param('id');

    const data = await media.importOne(id);
    return context.json({data});
  });

  router.put('/:media{game|movie|serie}/:id', Authentication.isLogged(), async (context: Context) => {
    const media = getMedia(context.req.param('media'));
    const id = context.req.param('id');
    const body = await context.req.json();
    const options = {
      ...body,
      id,
    };

    await media.update(id, options);
    return context.json({status: 200});
  });

  router.post('/:media{game|movie|serie}', Authentication.isLogged(), async (context: Context) => {
    const media = getMedia(context.req.param('media'));
    const body = await context.req.json();

    const data = await media.add(body);
    return context.json({data});
  });

  router.delete('/:media{game|movie|serie}/:id', Authentication.isLogged(), async (context: Context) => {
    const media = getMedia(context.req.param('media'));
    const id = context.req.param('id');

    await media.remove(id);
    return context.json({status: 200});
  });
}
