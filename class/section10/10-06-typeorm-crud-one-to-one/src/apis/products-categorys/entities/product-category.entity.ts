import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    @Field(() => String)
    name: string;
}