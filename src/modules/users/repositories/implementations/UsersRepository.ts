import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id: user_id,
      },
      relations: ["games"],
    });

    return user!;
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query(
      "SELECT * FROM users ORDER BY users.first_name ASC"
    );
    return users; // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const user = await this.repository.query(
      "SELECT * FROM users WHERE lower(users.first_name)=$1 AND lower(users.last_name)=$2",
      [first_name.toLowerCase(), last_name.toLowerCase()]
    ); // Complete usando raw query
    return user;
  }
}
