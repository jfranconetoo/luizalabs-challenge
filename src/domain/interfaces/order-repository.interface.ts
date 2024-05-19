import { OrderSummary } from '@domain/entities/order-summary';
import { Order } from '@domain/entities/order.entity';

export interface IOrderRepository {
    saveOrders(orders: Order[]): Promise<void>;

    summaryByOrderIdOrStartDateOrEndDate(
        orderId?: number,
        startDate?: Date,
        endDate?: Date,
    ): Promise<OrderSummary[]>;
}
