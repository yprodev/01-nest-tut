import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import User from "./user.entity";
import { CreateUserDto } from "./dto/createUser.dto"

const USER_EMAIL_NOT_FOUND_MSG = 'User with this email does not exist';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) return user;

    throw new HttpException(USER_EMAIL_NOT_FOUND_MSG, HttpStatus.NOT_FOUND);
  }
  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);

    return newUser;
  }
}


