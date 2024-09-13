import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRequest } from 'src/auth/user-request.interface';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @Request() req: { user: UserRequest },
  ) {
    console.log(req);
    const authorId = req.user.userId;
    return this.newsService.create(createNewsDto, authorId);
  }

  @Get()
  async findAll() {
    return await this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const userRole = req.user.role;
    return await this.newsService.update(id, updateNewsDto, userId, userRole);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: UserRequest }) {
    const userId = req.user.userId;
    const userRole = req.user.role;
    return this.newsService.remove(id, userId, userRole);
  }
}
