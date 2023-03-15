import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create({ ...createUserDto });
      return await this.userRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException(`Error creating user: ${e}`);
    }
  }

  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.findUserById(id);
      if (user) {
        return await this.userRepository.save({ user, ...updateUserDto });
      } else {
        throw new InternalServerErrorException(`User not found`);
      }
    } catch (e) {
      throw new InternalServerErrorException(`Error updating user: ${e}`);
    }
  }

  public async deleteUser(id: string): Promise<boolean> {
    try {
      const user = await this.findUserById(id);
      return !!(await this.userRepository.remove(user));
    } catch (e) {
      throw new InternalServerErrorException(`Error deleting user: ${e}`);
    }
  }
}
