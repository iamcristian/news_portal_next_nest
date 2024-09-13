import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRequest } from 'src/auth/user-request.interface';

@Controller('news/:newsId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('newsId') newsId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: { user: UserRequest },
  ) {
    const userId = req.user.userId;
    return this.commentsService.create(newsId, createCommentDto, userId);
  }

  @Get()
  findAll(@Param('newsId') newsId: string) {
    return this.commentsService.findAll(newsId);
  }
}
