import { Module } from '@nestjs/common';
import { NewsLikesService } from './news-likes.service';
import { NewsLikesController } from './news-likes.controller';

@Module({
  controllers: [NewsLikesController],
  providers: [NewsLikesService],
})
export class NewsLikesModule {}
