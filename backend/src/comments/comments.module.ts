import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentGatewayGateway } from './comment-gateway/comment-gateway.gateway';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentGatewayGateway],
})
export class CommentsModule {}
