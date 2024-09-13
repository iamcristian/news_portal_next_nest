import { Test, TestingModule } from '@nestjs/testing';
import { NewsLikesService } from './news-likes.service';

describe('NewsLikesService', () => {
  let service: NewsLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsLikesService],
    }).compile();

    service = module.get<NewsLikesService>(NewsLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
