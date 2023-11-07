// products.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
    IProductsServiceCreate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
        const result = this.productsRepository.save({
            ...createProductInput,

            // 하나 하나 직접 나열하는 방식
            //   name: '마우스',
            //   description: '좋은 마우스',
            //   price: 3000,
        });
        return result;
        // {id: akljdfq-1283aad,
        //	name: "마우스",
        //  description: "좋은 마우스",
        //  price: 3000}
    }
}