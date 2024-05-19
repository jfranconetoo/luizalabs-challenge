import { IOrder } from '@domain/interfaces/order.interface';
import { ObjectId } from 'mongodb';
import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity implements IOrder {
    @ObjectIdColumn()
    _id: ObjectId;
    @Column()
    userId: number;
    @Column()
    name: string;
    @Column()
    orderId: number;
    @Column()
    productId: number;
    @Column()
    value: number;
    @Column()
    date: Date;
}
