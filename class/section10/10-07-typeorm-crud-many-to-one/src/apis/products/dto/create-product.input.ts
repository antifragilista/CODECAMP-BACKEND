// create-product.input.ts

import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleLocationInput } from 'src/apis/products-sale-locations/dto/product-sale-location.input';

@InputType()
export class CreateProductInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Min(0)
    @Field(() => Int)
    price: number;

    @Field(() => ProductSaleLocationInput)
    productSaleslocation: ProductSaleLocationInput;

    @Field(() => String)
    productCategoryId: string;
}