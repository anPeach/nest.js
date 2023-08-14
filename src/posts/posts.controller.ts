import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({ status: 200, type: UserPost })
  @Get('/:id')
  getById(@Param() { id }) {
    return this.postService.getById(id);
  }

  @ApiOperation({ summary: 'Get post by user id' })
  @ApiResponse({ status: 200, type: UserPost })
  @Get('/:?')
  getByUserId(@Query('userId') userId: number) {
    return this.postService.getByUserId(userId);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: UserPost })
  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, type: UserPost })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param() { id }) {
    return this.postService.delete(id);
  }
}
