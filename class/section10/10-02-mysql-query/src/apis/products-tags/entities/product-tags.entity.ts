// prodcutTag.entity.ts

import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // N:M의 관계를 가질 때는 두 테이블 모두 컬럼을 추가하여 연결해 주어야 합니다.
    @ManyToMany(() => Product, (products) => products.productTags)
    products: Product[];
}