import { Request, Router } from 'express';

import { C7zResponse } from '../class/response';
import * as Authentication from '../model/authentication';
import * as Game from '../model/game';
import * as Token from '../model/token';

export const router = Router();

router.get('/api/game', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const search = (req.query.search) ? req.query.search + '' : null;
    const token = Token.getAccessToken(req);

    let data;
    if (search) {
      Token.verify(token);
      data = await Game.search(search);
    } else {
      data = await Game.getAll();
    }

    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/game/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;

    const data = await Game.getOne(id);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/game/:id/import', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;

    const data = await Game.importOne(id);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.put('/api/game/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const options = {
      ...body,
      _id: id,
    };

    const data = await Game.update(id, options);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.post('/api/game', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const body = req.body;

    const data = await Game.add(body);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.delete('/api/game/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;

    await Game.remove(id);
    res.send({status: 200});
  } catch (error) {
    return next(error);
  }
});
