import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { ProductsCategoriesResolver } from './products-categories.resolver';
import { ProductsCategoriesService } from './products-categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]),
  ],
  providers: [
    ProductsCategoriesResolver, //
    ProductsCategoriesService,
  ],
})
export class ProductsCategoriesModule {}
