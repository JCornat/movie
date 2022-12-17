import { Request, Router } from 'express';

import { C7zResponse } from '../class/response';
import * as Authentication from '../model/authentication';
import * as Game from '../model/game';
import * as Movie from '@model/movie';
import * as Serie from '@model/serie';
import * as Token from '@model/token';

export const router = Router();

function getMedia(media: string): any {
  switch (media) {
    case 'game':
      return Game;
    case 'movie':
      return Movie;
    case 'serie':
      return Serie;
    default:
      throw {status: 400, method: 'Media.getMedia', message: `Paramètres invalides`};
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

    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/:media(game|movie|serie)/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const id = req.params.id;

    const data = await media.getOne(id);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/:media(game|movie|serie)/:id/import', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const id = req.params.id;

    const data = await media.importOne(id);
    res.send({data});
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

    const data = await media.update(id, options);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.post('/api/:media(game|movie|serie)', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const body = req.body;

    const data = await media.add(body);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.delete('/api/:media(game|movie|serie)/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const media = getMedia(req.params.media);
    const id = req.params.id;

    await media.remove(id);
    res.send({status: 200});
  } catch (error) {
    return next(error);
  }
});
