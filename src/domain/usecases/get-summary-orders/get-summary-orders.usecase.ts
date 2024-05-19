import { OrderSummaryFiltersDto } from '@application/facades/dtos/order-summary-filters.dto';
import { OrderSummary } from '@domain/entities/order-summary';
import { IOrderRepository } from '@domain/interfaces/order-repository.interface';

export class GetSummaryOrdersUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(filters: OrderSummaryFiltersDto): Promise<OrderSummary[]> {
        const { orderId, startDate, endDate } = filters;
        return this.orderRepository.summaryByOrderIdOrStartDateOrEndDate(
            orderId,
            startDate,
            endDate,
        );
    }
}
