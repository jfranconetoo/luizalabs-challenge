type Products = {
    productId: number;
    value: number;
};

type Orders = {
    orderId: number;
    total: number;
    date: Date;
    products: Products[];
};

export class OrderSummary {
    userId: number;
    name: string;
    orders: Orders[];
}
