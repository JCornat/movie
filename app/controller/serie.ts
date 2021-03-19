import { Request, Router } from 'express';

import { C7zResponse } from '../class/response';
import * as Authentication from '../model/authentication';
import * as Serie from '../model/serie';
import * as Token from '../model/token';

export const router = Router();

router.get('/api/serie', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const search = (req.query.search) ? req.query.search + '' : null;
    const token = Token.getAccessToken(req);

    let data;
    if (search) {
      Token.verify(token);
      data = await Serie.search(search);
    } else {
      data = await Serie.getAll();
    }

    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/serie/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;
    const options = {
      id,
    };

    const data = await Serie.getOne(options);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/serie/:id/import', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;

    const data = await Serie.importOne(id);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.put('/api/serie/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const options = {
      ...body,
      _id: id,
    };

    const data = await Serie.update(options);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.post('/api/serie', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const body = req.body;

    const data = await Serie.add(body);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.delete('/api/serie/:id', Authentication.isLogged(), async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;
    const options = {
      id,
    };

    await Serie.remove(options);
    res.send({status: 200});
  } catch (error) {
    return next(error);
  }
});
