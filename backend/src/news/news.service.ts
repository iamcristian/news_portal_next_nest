import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto) {
    return await this.prisma.news.create({
      data: createNewsDto,
    });
  }

  async findAll() {
    return await this.prisma.news.findMany({
      include: {
        category: true,
        author: true,
        comments: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.news.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
        comments: true,
      },
    });
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    return await this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.news.delete({
      where: { id },
    });
  }
}
