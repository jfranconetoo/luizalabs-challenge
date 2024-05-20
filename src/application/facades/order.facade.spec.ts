import { OrderSummaryFiltersDto } from './dtos/order-summary-filters.dto';
import { IOrderFacade } from './interfaces/order-facade';
import { OrderFacadeImpl } from './order.facade';
import { faker } from '@faker-js/faker';

const mockProcessFileAndBatchInsertUseCase = {
    execute: jest.fn(),
};
const mockGetSummaryOrdersUseCase = {
    execute: jest.fn(),
};

jest.mock(
    '@domain/usecases/process-file-and-batch-insert/process-file-and-batch-insert.usecase',
    () => ({
        ProcessFileAndBatchInsertUseCase: mockProcessFileAndBatchInsertUseCase,
    }),
);
jest.mock(
    '@domain/usecases/get-summary-orders/get-summary-orders.usecase',
    () => ({
        GetSummaryOrdersUseCase: mockGetSummaryOrdersUseCase,
    }),
);

describe('OrderFacadeImpl', () => {
    let orderFacade: IOrderFacade;

    beforeEach(() => {
        orderFacade = new OrderFacadeImpl(
            mockProcessFileAndBatchInsertUseCase as any,
            mockGetSummaryOrdersUseCase as any,
        );
    });

    describe('processFileAndBatchInsert', () => {
        it('should call ProcessFileAndBatchInsertUseCase.execute with the provided file', async () => {
            const mockFile = jest.fn(); // Simulate a NodeJS.ReadableStream
            await orderFacade.processFileAndBatchInsert(mockFile as any);

            expect(
                mockProcessFileAndBatchInsertUseCase.execute,
            ).toHaveBeenCalledWith(mockFile);
        });
    });

    describe('getSummaryOrders', () => {
        it('should call GetSummaryOrdersUseCase.execute with the provided filters', async () => {
            const mockFilters: OrderSummaryFiltersDto = {
                orderId: 123,
                startDate: faker.date.past(),
                endDate: faker.date.future(),
            };
            await orderFacade.getSummaryOrders(mockFilters);

            expect(mockGetSummaryOrdersUseCase.execute).toHaveBeenCalledWith(
                mockFilters,
            );
        });
    });
});
