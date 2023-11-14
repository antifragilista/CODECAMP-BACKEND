import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleLocationInput } from './dto/product-sale-location.input';
import { ProductSaleslocation } from './entities/product-sale-location.entity';

@Injectable()
export class ProductsSaleslocationsService {
    constructor(
        @InjectRepository(ProductSaleslocation)
        private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,
    ) {}

    create({ ...productSaleslocation }: ProductSaleLocationInput) {
        return this.productsSaleslocationsRepository.save({
            ...productSaleslocation,

            // 하나하나 직접 나열하는 방식
            // address: productSaleslocation.address,
            // addressDetail: productSaleslocation.addressDetail,
            // lat: ...
        });
    }
}