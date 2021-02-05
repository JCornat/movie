import { Request, Router } from 'express';

import { C7zResponse } from '../class/response';
import * as Movie from '../model/movie';

export const router = Router();

router.get('/api/movie', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const search = (req.query.search) ? req.query.search + '' : null;

    let data;
    if (search) {
      data = await Movie.search(search);
    } else {
      data = await Movie.getAll();
    }

    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/movie/:id', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;
    const options = {
      id,
    };

    const data = await Movie.getOne(options);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.get('/api/movie/:id/import', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;

    const data = await Movie.importOne(id);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.put('/api/movie/:id', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const options = {
      ...body,
      _id: id,
    };

    const data = await Movie.update(options);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.post('/api/movie', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const body = req.body;

    const data = await Movie.add(body);
    res.send({data});
  } catch (error) {
    return next(error);
  }
});

router.delete('/api/movie/:id', async (req: Request, res: C7zResponse, next: any) => {
  try {
    const id = req.params.id;
    const options = {
      id,
    };

    await Movie.remove(options);
    res.send({status: 200});
  } catch (error) {
    return next(error);
  }
});
