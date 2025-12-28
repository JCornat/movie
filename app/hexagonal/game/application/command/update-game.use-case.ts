import { z } from 'zod';
import { ArgumentInvalidException } from '../../../lib/exception';
import { GameRepository } from '../../domain/repository/game.repository';
import { defaultGameRepository } from '../../infrastructure/repository/game.fs.repository';

const schema = z.object({
  query: z.string(),
});

type UnsafePayload = z.input<typeof schema>;

export class UpdateGameUseCase {
  constructor(
    private readonly gameRepository: GameRepository = defaultGameRepository,
  ) {}

  async handle(unsafePayload: UnsafePayload) {
    const { query } = this.validate(unsafePayload);
    return await this.gameRepository.save(query);
  }

  private validate(unsafePayload: UnsafePayload) {
    const res = schema.safeParse(unsafePayload);
    if (res.error) {
      throw new ArgumentInvalidException();
    }

    return res.data;
  }
}
