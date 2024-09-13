import { Test, TestingModule } from '@nestjs/testing';
import { CommentGatewayGateway } from './comment-gateway.gateway';

describe('CommentGatewayGateway', () => {
  let gateway: CommentGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentGatewayGateway],
    }).compile();

    gateway = module.get<CommentGatewayGateway>(CommentGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
