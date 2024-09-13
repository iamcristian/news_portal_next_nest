import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { NewsModule } from './news/news.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { NewsLikesModule } from './news-likes/news-likes.module';

@Module({
  imports: [AuthModule, NewsModule, CategoriesModule, CommentsModule, TagsModule, NewsLikesModule],
  providers: [PrismaService],
})
export class AppModule {}
