// products.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../products-sale-locations/entities/product-sale-location.entity';
import { ProductsSaleslocationsService } from '../products-sale-locations/products-sale-locations.service';
import { ProductsTagsService } from '../products-tags/product-tags.service';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import {ProductTag} from "../products-tags/entities/product-tag.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductSaleslocation,
            ProductTag
        ]),
    ],
    providers: [
        ProductsResolver,
        ProductsService,
        ProductsSaleslocationsService,
        ProductsTagsService,
    ],
})
export class ProductsModule {}