import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsLikeDto {
  @IsString()
  @IsNotEmpty()
  newsId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
