import { OrderSummary } from '@domain/entities/order-summary';
import { OrderSummaryFiltersDto } from '../dtos/order-summary-filters.dto';

export interface IOrderFacade {
    processFileAndBatchInsert(file: NodeJS.ReadableStream): Promise<void>;

    getSummaryOrders(filters: OrderSummaryFiltersDto): Promise<OrderSummary[]>;
}
