type Products = {
    product_id: number;
    value: number;
};

type Orders = {
    order_id: number;
    total: number;
    date: Date;
    products: Products[];
};

export class OrderSummary {
    user_id: number;
    name: string;
    orders: Orders[];
}
