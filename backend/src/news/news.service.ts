import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto, authorId: string) {
    return await this.prisma.news.create({
      data: {
        ...createNewsDto,
        authorId,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    return await this.prisma.news.findMany({
      skip,
      take: limit,
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

  async update(
    id: string,
    updateNewsDto: UpdateNewsDto,
    userId: string,
    userRole: string,
  ) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new HttpException('News not found', HttpStatus.NOT_FOUND);
    }

    if (news.authorId !== userId && userRole !== 'admin') {
      throw new HttpException(
        'You are not allowed to update this news',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
    });
  }

  async remove(id: string, userId: string, userRole: string) {
    const news = await this.prisma.news.findUnique({ where: { id } });

    if (!news) {
      throw new HttpException('News not found', HttpStatus.NOT_FOUND);
    }

    if (news.authorId !== userId && userRole !== 'admin') {
      throw new HttpException(
        'You are not allowed to delete this news',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.prisma.news.delete({
      where: { id },
    });
  }

  async search(query: string) {
    return await this.prisma.news.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ]
      }
    })
  
  }
}
