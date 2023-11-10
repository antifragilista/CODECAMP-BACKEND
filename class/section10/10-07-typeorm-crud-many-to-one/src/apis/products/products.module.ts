// products.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../products-sale-locations/entities/product-sale-location.entity';
import { ProductsSaleslocationsService } from '../products-sale-locations/products-sale-locations.service';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductSaleslocation,
        ]),
    ],
    providers: [
        ProductsResolver,
        ProductsService,
        ProductsSaleslocationsService,
    ],
})
export class ProductsModule {}