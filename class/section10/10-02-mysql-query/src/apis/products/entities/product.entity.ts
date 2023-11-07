// product.entity.ts

import { ProductSaleslocation } from 'src/apis/products-sales-locations/entities/product-sales-locations.entity';
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
import {ProductCategory} from "../../products-categorys/entities/product-category.entity";
import {User} from "../../users/entities/user.entity";
import {ProductTag} from "../../products-tags/entities/product-tags.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({default: false})
    isSoldout: boolean;

    // 두 테이블을 하나로 합쳐서 데이터를 가져와야하기에 사용하였으며, 한쪽 테이블에만 적어줘야 합니다.
    @JoinColumn()
    // 두 테이블의 관계를 나타내는 것으로 @OneToOne() 은 한쪽에만 쓰거나, 양쪽에 모두 써줄 수 있습니다. 여기서는 Product에만 써주겠습니다.
    @OneToOne(() => ProductSaleslocation)
    productSaleslocation: ProductSaleslocation;

    @ManyToOne(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    user: User;

    @JoinTable()
    // N:M의 관계를 가질 때는 두 테이블 모두 컬럼을 추가하여 연결해 주어야 합니다.
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    productTags: ProductTag[];
}