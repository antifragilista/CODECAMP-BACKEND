// products-service.interface.ts

import { CreateProductInput } from '../dto/create-product.input';

export interface IProductsServiceCreate {
    createProductInput: CreateProductInput;
}