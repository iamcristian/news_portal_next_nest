import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newsId: string,
    createCommentDto: CreateCommentDto,
    userId: string,
  ) {
    return await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        newsId,
        userId,
      },
    });
  }

  async findAll(newsId: string) {
    const comments = await this.prisma.comment.findMany({
      where: { newsId },
      include: { user: true },
    });
    if (!comments.length)
      throw new NotFoundException(`Comments for news #${newsId} not found`);
    return comments;
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
