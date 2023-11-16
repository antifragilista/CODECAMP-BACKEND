// product.entity.ts

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/products-categories/entities/product-category.entity';
import { ProductSaleslocation } from 'src/apis/products-sale-locations/entities/product-sale-location.entity';
import { ProductTag } from 'src/apis/products-tags/entities/product-tag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    description: string;

    @Column()
    @Field(() => Int)
    price: number;

    @Column({ default: false })
    @Field(() => Boolean)
    isSoldout: boolean;

    @JoinColumn()
    @OneToOne(() => ProductSaleslocation)
    @Field(() => ProductSaleslocation)
    productSaleslocation: ProductSaleslocation;

    @ManyToOne(() => ProductCategory)
    @Field(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    @Field(() => [ProductTag])
    productTags: ProductTag[];
    // 데이터 등록시 등록 시간 자동으로 추가
    @CreateDateColumn()
    createdAt: Date;
    // 데이터 수정시 수정 시간 자동으로 추가
    @UpdateDateColumn()
    updatedAt: Date;
    // 소프트삭제 시간 기록을 위함
    // DeleteDateColumn을 이용하면 데이터를 조회할때 조건을 주지 않아도 삭제 되지 않은 데이터만 조회 됨
    @DeleteDateColumn()
    deletedAt: Date;
}