import { z } from 'zod';
import { GameProvider } from '../../domain/provider/game.provider';
import { defaultGameProvider } from '../../infrastructure/provider/game.igdb.provider';
import { ArgumentInvalidException } from '../../../util/exception';

const schema = z.object({
  query: z.string(),
});

type UnsafePayload = z.input<typeof schema>;

export class SearchGamesUseCase {
  constructor(
    private readonly gameProvider: GameProvider = defaultGameProvider,
  ) {}

  async handle(unsafePayload: UnsafePayload) {
    const { query } = this.validate(unsafePayload);
    return await this.gameProvider.search(query);
  }

  private validate(unsafePayload: UnsafePayload) {
    const res = schema.safeParse(unsafePayload);
    if (res.error) {
      throw new ArgumentInvalidException();
    }

    return res.data;
  }
}
