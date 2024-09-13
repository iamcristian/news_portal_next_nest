import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { NewsModule } from './news/news.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, NewsModule, CategoryModule],
  providers: [PrismaService],
})
export class AppModule {}
