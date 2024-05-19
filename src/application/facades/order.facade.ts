import { ProcessFileAndBatchInsertUseCase } from '@domain/usecases/process-file-and-batch-insert/process-file-and-batch-insert.usecase';
import { OrderSummary } from '@domain/entities/order-summary';
import { OrderSummaryFiltersDto } from './dtos/order-summary-filters.dto';
import { IOrderFacade } from './interfaces/order-facade';
import { GetSummaryOrdersUseCase } from '@domain/usecases/get-summary-orders/get-summary-orders.usecase';

export class OrderFacadeImpl implements IOrderFacade {
    constructor(
        private readonly processFileAndBatchInsertUseCase: ProcessFileAndBatchInsertUseCase,
        private readonly getSummaryOrdersUseCase: GetSummaryOrdersUseCase,
    ) {}

    async processFileAndBatchInsert(
        file: NodeJS.ReadableStream,
    ): Promise<void> {
        return this.processFileAndBatchInsertUseCase.execute(file);
    }

    getSummaryOrders(filters: OrderSummaryFiltersDto): Promise<OrderSummary[]> {
        return this.getSummaryOrdersUseCase.execute(filters);
    }
}
