import { GameRepository } from '../../domain/repository/game.repository';
import { defaultGameRepository } from '../../infrastructure/repository/game.fs.repository';

export class ListGamesUseCase {
  constructor(
    private readonly gameRepository: GameRepository = defaultGameRepository,
  ) {}

  async handle() {
    return await this.gameRepository.getAll();
  }
}
