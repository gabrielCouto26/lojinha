import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { User as IUser } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(user: IUser): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(id: number, params: IUser): Promise<User | null> {
    let user = await this.usersRepository.findOneBy({ id })
    if (!user)
      return null

    let updated = this.usersRepository.merge(user, params)
    return await this.usersRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}