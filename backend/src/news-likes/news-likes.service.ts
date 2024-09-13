import { Injectable } from '@nestjs/common';
import { CreateNewsLikeDto } from './dto/create-news-like.dto';
import { UpdateNewsLikeDto } from './dto/update-news-like.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NewsLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNewsLikeDto: CreateNewsLikeDto) {
    return await this.prisma.newsLike.create({
      data: createNewsLikeDto,
    });
  }

  async findAll() {
    return this.prisma.newsLike.findMany();
  }

  async findOne(id: string) {
    return this.prisma.newsLike.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateNewsLikeDto: UpdateNewsLikeDto) {
    return this.prisma.newsLike.update({
      where: { id },
      data: updateNewsLikeDto,
    });
  }

  async remove(id: string) {
    return this.prisma.newsLike.delete({
      where: { id },
    });
  }
}
