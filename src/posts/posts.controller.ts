import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Post as UserPost } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({ status: 200, type: UserPost })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, type: UserPost })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param() { id }) {
    return this.postService.delete(id);
  }
}
