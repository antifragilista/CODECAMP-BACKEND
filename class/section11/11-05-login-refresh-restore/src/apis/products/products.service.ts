// products.service.ts

import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import { Product } from './entities/product.entity';
import {
    IProductsServiceCheckSoldout,
    IProductsServiceCreate,
    IProductsServiceDelete,
    IProductsServiceFindOne,
    IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import {ProductsSaleslocationsService} from "../products-sale-locations/products-sale-locations.service";
import { ProductsTagsService } from '../products-tags/product-tags.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly productsSaleslocationService: ProductsSaleslocationsService,
        private readonly productsTagsService: ProductsTagsService,
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find({
            relations: ['productSaleslocation', 'productCategory'],
        });
    }

    async findOne({ productId }: IProductsServiceFindOne): Promise<Product | null> {
        return await this.productsRepository.findOne({
            where: { id: productId },
            relations: ['productSaleslocation', 'productCategory'],
        });
    }

    async create({ createProductInput }: IProductsServiceCreate): Promise<Product> {

        const { productSaleslocation, productCategoryId, productTags, ...product } =
            createProductInput;

        const result = await this.productsSaleslocationService.create({
            ...productSaleslocation,
        });

        // productTags가 ["#전자제품", "#영등포", "#컴퓨터"]와 같은 패턴으로 가정
        const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"] // 로직 설명 4
        const prevTags = await this.productsTagsService.findByNames({ tagNames }); // 로직 설명 5

        const temp = [];
        tagNames.forEach((el) => {
            const exists = prevTags.find((prevEl) => el === prevEl.name);
            if (!exists) temp.push({ name: el });
        }); // 로직 설명 6
        const newTags = await this.productsTagsService.bulkInsert({ names: temp }); // 로직 설명 7

        const tags = [...prevTags, ...newTags.identifiers]; // newTags.identifiers  =>  등록된 id 배열. ex, [{ id: aaa }, { id: qqq }, ...]
        // 1. 실무에서 반드시 for문 써야하는 경우가 아니면, for문 잘 안 씀 => map, forEach 사용
        // 2. for안에서 await를 사용하지 않음 => 안티패턴 => Promise.all 사용
        // 3. DB에 동일한 패턴 데이터를 반복적으로 등록하지 않음(네트워크 왔다갔다 비효율) => bulk-insert 사용

        // 2-3) 상품 등록
        const result2 = await this.productsRepository.save({
            ...product,
            productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
            productCategory: {
                id: productCategoryId,
            },
            productTags: tags,
        });

        return result2;
    }

    // async update({
    //            productId,
    //            updateProductInput,
    //        }: IProductsServiceUpdate): Promise<Product> {
    //     const product: Product = await this.findOne({ productId });
    //
    //     this.checkSoldout({ product });
    //
    //     const result = await this.productsRepository.save({
    //         ...product, // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
    //         ...updateProductInput,
    //     });
    //
    //     return result;
    // }

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