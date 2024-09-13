import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([new News()]),
            findOne: jest.fn().mockResolvedValue(new News()),
            create: jest.fn().mockResolvedValue(new News()),
            update: jest.fn().mockResolvedValue(new News()),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of news', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([new News()]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single news item', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(new News());
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a news item', async () => {
    const dto: CreateNewsDto = {
      title: 'Test Title',
      content: 'Test Content',
      categoryId: 'TestCategoryId',
    };
    const req = {
      user: {
        userId: 'TestUserId',
        role: 'TestRole',
        email: 'test@example.com',
      },
    };
    const result = await controller.create(dto, req);
    expect(result).toEqual(new News());
    expect(service.create).toHaveBeenCalledWith(dto, 'TestUserId');
  });

  it('should update a news item', async () => {
    const dto: CreateNewsDto = {
      title: 'Updated Title',
      content: 'Updated Content',
      categoryId: 'UpdatedCategoryId',
    };
    const req = { user: { userId: 'TestUserId', role: 'TestRole' } };
    const result = await controller.update('1', dto, req);
    expect(result).toEqual(new News());
    expect(service.update).toHaveBeenCalledWith(
      '1',
      dto,
      'TestUserId',
      'TestRole',
    );
  });

  it('should delete a news item', async () => {
    const req = {
      user: {
        userId: 'TestUserId',
        role: 'TestRole',
        email: 'test@example.com',
      },
    };
    const result = await controller.remove('1', req);
    expect(result).toEqual(true);
    expect(service.remove).toHaveBeenCalledWith('1', 'TestUserId', 'TestRole');
  });
});
