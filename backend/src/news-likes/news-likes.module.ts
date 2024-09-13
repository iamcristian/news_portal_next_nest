import { Module } from '@nestjs/common';
import { NewsLikesService } from './news-likes.service';
import { NewsLikesController } from './news-likes.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NewsLikesController],
  providers: [NewsLikesService],
})
export class NewsLikesModule {}
