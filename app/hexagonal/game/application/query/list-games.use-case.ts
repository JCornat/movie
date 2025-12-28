import { GameRepository } from '../../domain/repository/game.repository';

export class ListGamesUseCase {
  constructor(
    private readonly gameRepository: GameRepository,
  ) {}

  async handle() {
    return await this.gameRepository.getAll();
  }
}
