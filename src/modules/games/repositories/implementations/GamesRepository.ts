import { createQueryBuilder, getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const game = await this.repository
      .createQueryBuilder()
      .select("game")
      .from(Game, "game")
      .where("game.title ILIKE :param", { param: `%${param}%` })
      .getMany();
    return game;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const games = await this.repository.query("SELECT COUNT(games) FROM games");
    return games; // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
      .createQueryBuilder()
      .select("game")
      .from(Game, "game")
      .leftJoinAndSelect("game.users", "users")
      .where("game.id = :id", { id })
      .getOne();
    return game?.users!;
    // Complete usando query builder
  }
}
