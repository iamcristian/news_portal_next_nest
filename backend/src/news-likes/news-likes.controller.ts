import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsLikesService } from './news-likes.service';
import { CreateNewsLikeDto } from './dto/create-news-like.dto';
import { UpdateNewsLikeDto } from './dto/update-news-like.dto';

@Controller('news-likes')
export class NewsLikesController {
  constructor(private readonly newsLikesService: NewsLikesService) {}

  @Post()
  create(@Body() createNewsLikeDto: CreateNewsLikeDto) {
    return this.newsLikesService.create(createNewsLikeDto);
  }

  @Get()
  findAll() {
    return this.newsLikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsLikesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsLikeDto: UpdateNewsLikeDto) {
    return this.newsLikesService.update(id, updateNewsLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsLikesService.remove(id);
  }
}
