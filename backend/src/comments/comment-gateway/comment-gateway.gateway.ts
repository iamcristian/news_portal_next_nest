import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommentsService } from '../comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentService: CommentsService) {}

  @SubscribeMessage('createComment')
  async handleCreateComment(
    @MessageBody()
    {
      newsId,
      createCommentDto,
      userId,
    }: {
      newsId: string;
      createCommentDto: CreateCommentDto;
      userId: string;
    },
  ) {
    const comment = await this.commentService.create(
      newsId,
      createCommentDto,
      userId,
    );
    this.server.emit(`news-${newsId}-comments`, comment);
  }
}
