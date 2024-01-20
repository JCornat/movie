import { Request, Router } from 'express';

import { C7zResponse } from '@model/definition';
import { Token } from '@model/token';
import { Authentication } from '@model/authentication';
import { game } from '@model/game';
import { movie } from '@model/movie';
import { serie } from '@model/serie';

export const router = Router();

function getMedia(media: string): any {
  switch (media) {
    case 'game':
      return game;
    case 'movie':
      return movie;
    case 'serie':
      return serie;
    default:
      throw { status: 400, method: 'Media.getMedia', message: `Paramètres invalides` };
  }
}

router.get('/api/:media(game|movie|serie)', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const search = (req.query.search) ? req.query.search + '' : null;
    const token = Token.getAccessToken(req);

    let data;
    if (search) {
      Token.verify(token);
      data = await media.search(search);
    } else {
      data = await media.getAll();
    }

    res.send({ data });
  } catch (error) {
    return next(error);
  }
});

router.get('/api/:media(game|movie|serie)/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const id = req.params.id;

    const data = await media.getOne(id);
    res.send({ data });
  } catch (error) {
    return next(error);
  }
});

router.get('/api/:media(game|movie|serie)/:id/import', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const id = req.params.id;

    const data = await media.importOne(id);
    res.send({ data });
  } catch (error) {
    return next(error);
  }
});

router.put('/api/:media(game|movie|serie)/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const id = req.params.id;
    const body = req.body;
    const options = {
      ...body,
      id,
    };

    await media.update(id, options);
    res.send({ status: 200 });
  } catch (error) {
    return next(error);
  }
});

router.post('/api/:media(game|movie|serie)', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const body = req.body;

    const data = await media.add(body);
    res.send({ data });
  } catch (error) {
    return next(error);
  }
});

router.delete('/api/:media(game|movie|serie)/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const id = req.params.id;

    await media.remove(id);
    res.send({ status: 200 });
  } catch (error) {
    return next(error);
  }
});
