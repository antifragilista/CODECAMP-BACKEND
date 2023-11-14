// products.service.ts

import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
    IProductsServiceCheckSoldout,
    IProductsServiceCreate,
    IProductsServiceFindOne,
    IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>, //
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    async findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
        return await this.productsRepository.findOne({ where: { id: productId } });
    }

    async create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
        try {
            return await this.productsRepository.save({
                ...createProductInput, // 스프레드연산자 사용하기

                // 하나하나 직접 나열하기
                // name: createProductInput.name,
                // description: createProductInput.description,
                // price: createProductInput.price,
            });
        } catch(error) {
            throw error
            console.log(error)
        }
    }

    async update({
               productId,
               updateProductInput,
           }: IProductsServiceUpdate): Promise<Product> {
        const product = await this.findOne({ productId });

        // 추가
        // 검증은 서비스에서 하자!!
        this.checkSoldout({ product });

        // this.productsRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
        // this.productsRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
        // this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정 방법

        const result = await this.productsRepository.save({
            ...product, // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
            ...updateProductInput,
        });
        return result;
    }

    // 추가
    checkSoldout({ product }: IProductsServiceCheckSoldout): void {
        if (product.isSoldout)
            throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');

        // if (product.isSoldout) {
        //   throw new HttpException(
        //     '이미 판매 완료된 상품입니다.',
        //     HttpStatus.UNPROCESSABLE_ENTITY,
        //   );
        // }
    }
}