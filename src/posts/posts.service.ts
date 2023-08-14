import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(dto: CreatePostDto) {
    return this.postRepository.create(dto);
  }

  async getAll() {
    return this.postRepository.findAll({ include: { all: true } });
  }

  async getById(id: number) {
    return this.postRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async getByUserId(id: number) {
    return this.postRepository.findOne({
      where: { userId: id },
      include: { all: true },
    });
  }

  async delete(id: number) {
    return this.postRepository.destroy({
      where: { id },
    });
  }
}
