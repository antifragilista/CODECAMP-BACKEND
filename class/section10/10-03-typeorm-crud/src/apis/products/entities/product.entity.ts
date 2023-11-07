// product.entity.ts

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/products-categorys/entities/product-category.entity';
import { ProductSaleslocation } from 'src/apis/products-sales-locations/entities/product-sale-location.entity';
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
}