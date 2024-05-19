import { IOrder } from '@domain/interfaces/order.interface';

export class Order implements IOrder {
    userId: number;
    name: string;
    orderId: number;
    productId: number;
    value: number;
    date: Date;

    constructor(props: Order) {
        Object.assign(this, props);
    }
}
