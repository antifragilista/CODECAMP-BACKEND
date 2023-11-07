// products.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
    // TypeOrmModule.forFeature메서드는 엔티티를 전달합니다.
    // 만약 import 하지 않으면 typeorm을 이용해 데이터베이스와 연동이 안됩니다.
    imports: [
        TypeOrmModule.forFeature([
            Product, //
        ]),
    ],
    providers: [
        ProductsResolver, //
        ProductsService,
    ],
})
export class ProductsModule {}