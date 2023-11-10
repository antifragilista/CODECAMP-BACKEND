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
    IProductsServiceDelete,
    IProductsServiceFindOne,
    IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import {ProductsSaleslocationsService} from "../products-sale-locations/products-sale-locations.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly productsSaleslocationService: ProductsSaleslocationsService
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find({
            relations: ['productSaleslocation'],
        });
    }

    async findOne({ productId }: IProductsServiceFindOne): Promise<Product | null> {
        return await this.productsRepository.findOne({
            where: { id: productId },
            relations: ['productSaleslocation'],
        });
    }

    async create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
        // 1. 상품만 등록하는 경우
        // const result = this.productsRepository.save({
        //   ...createProductInput,

        //   // 하나하나 직접 나열하는 방식
        //   //   name: '마우스',
        //   //   description: '좋은 마우스',
        //   //   price: 3000,
        // });

        // 2. 상품과 상품거래위치를 같이 등록하는 경우
        const { productSaleslocation, ...product } = createProductInput;

        const result = await this.productsSaleslocationService.create({
            ...productSaleslocation,
        }); // 서비스를 타고 가는 이유는...?(레파지토리에 직접 접근하면 안될까...?) => 검증을 서비스에서 진행하기 때문

        const result2 = await this.productsRepository.save({
            ...product,
            productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기

            // 하나하나 직접 나열하는 방식
            // name: product.name,
            // description: product.description,
            // price: product.price,
            // productSaleslocation: {
            //   id: result.id,
            // },
        });

        // 최종 결과 돌려주기
        return result2;
    }

    async update({
               productId,
               updateProductInput,
           }: IProductsServiceUpdate): Promise<Product> {
        const product = await this.findOne({ productId });


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

    async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
        const result = await this.productsRepository.softDelete({ id: productId });
        return !!result.affected;
    }

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