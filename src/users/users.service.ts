import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    const role = await this.roleService.getByValue('USER');

    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  getByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  getById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  getAll() {
    return this.userRepository.findAll();
  }

  async addRole(dto: AddRoleDto, id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException(
        `User with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const role = await this.roleService.getByValue(dto.value);
    if (!role) {
      throw new HttpException(
        `Role '${dto.value}' doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    await user.$add('role', role.id);
    return user;
  }
}
