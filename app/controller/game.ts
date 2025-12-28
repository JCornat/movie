import { Request, Response, Router } from 'express';
import { Token } from '@model/token';
import { Authentication } from '@model/authentication';
import { UpdateGameUseCase } from '../hexagonal/game/application/command/update-game.use-case';
import { ListGamesUseCase } from '../hexagonal/game/application/query/list-games.use-case';
import { SearchGamesUseCase } from '../hexagonal/game/application/query/search-games.use-case';

const gameController = Router();

gameController.get('/api/game', async (req: Request, res: Response) => {
  const search = (req.query.search) ? req.query.search + '' : null;
  const token = Token.getAccessToken(req);

  let data;
  if (search) {
    Token.verify(token);
    data = await new SearchGamesUseCase().handle({ query: search });
  } else {
    data = await new ListGamesUseCase().handle();
  }

  res.send({ data });
});

gameController.get('/api/game/:id', Authentication.isLogged(), async (req: Request, res: Response, next: any) => {
  const id = req.params.id;
  const data = await new GetGameUseCase.handle({ id });
  res.send({ data });
});

gameController.get('/api/game/:id/import', Authentication.isLogged(), async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await new ImportGameUseCase.handle({ id });
  res.send({ data });
});

gameController.put('/api/game/:id', Authentication.isLogged(), async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  await new UpdateGameUseCase().handle({
    ...body,
    id,
  });

  res.send({ status: 200 });
});

gameController.post('/api/game', Authentication.isLogged(), async (req: Request, res: Response) => {
  const body = req.body;
  const data = await new AddGameUseCase().handle(body);
  res.send({ data });
});

gameController.delete('/api/game/:id', Authentication.isLogged(), async (req: Request, res: Response) => {
  const id = req.params.id;
  await new RemoveGameUseCase().handle({ id });
  res.send({ status: 200 });
});

export { gameController };
