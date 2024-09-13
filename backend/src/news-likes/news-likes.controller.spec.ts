import { Test, TestingModule } from '@nestjs/testing';
import { NewsLikesController } from './news-likes.controller';
import { NewsLikesService } from './news-likes.service';

describe('NewsLikesController', () => {
  let controller: NewsLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsLikesController],
      providers: [NewsLikesService],
    }).compile();

    controller = module.get<NewsLikesController>(NewsLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
