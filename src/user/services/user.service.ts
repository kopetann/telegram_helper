import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { BotService } from '../../bot/services/bot.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => BotService))
    private readonly botService: BotService,
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
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { bots: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create({ ...createUserDto });

      if (createUserDto.botsIds) {
        user.bots = await this.botService.findBotsByIds(createUserDto.botsIds);
      }

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

      if (updateUserDto.botsIds) {
        user.bots = await this.botService.findBotsByIds(updateUserDto.botsIds);
      }

      return await this.userRepository.save({ ...user, ...updateUserDto });
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
