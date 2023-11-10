// main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter.cs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class-validator 라이브러리를 사용하기 위한 추가 설정
  // Pipe는 데이터가 오고가는 흐름에 있어서 데이터 검증과 필터링을 해주는 역할
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();