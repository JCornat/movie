import { z } from 'zod';
import { GameRepository } from '../../domain/repository/game.repository';
import { defaultGameRepository } from '../../infrastructure/repository/game.fs.repository';
import { ratingSchema } from '../../../shared/domain/rating';
import { ArgumentInvalidException } from '../../../util/exception';

const schema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.number(),
  rating: ratingSchema,
  url: z.string().optional(),
});

type UnsafePayload = z.input<typeof schema>;

export class UpdateGameUseCase {
  constructor(
    private readonly gameRepository: GameRepository = defaultGameRepository,
  ) {}

  async handle(unsafePayload: UnsafePayload) {
    const payload = this.validate(unsafePayload);
    return await this.gameRepository.save(payload);
  }

  private validate(unsafePayload: UnsafePayload) {
    const res = schema.safeParse(unsafePayload);
    if (res.error) {
      throw new ArgumentInvalidException();
    }

    return res.data;
  }
}
