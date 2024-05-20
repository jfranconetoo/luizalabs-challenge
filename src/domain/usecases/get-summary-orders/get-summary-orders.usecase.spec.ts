import { faker } from '@faker-js/faker';
import { IOrderRepository } from '@domain/interfaces/order-repository.interface';
import { GetSummaryOrdersUseCase } from './get-summary-orders.usecase';
import { OrderSummary } from '@domain/entities/order-summary';

jest.mock('@domain/interfaces/order-repository.interface');

const orderSummaryFactory = (length: number) =>
    Array.from(
        { length },
        () =>
            ({
                userId: faker.number.int(),
                name: faker.person.firstName(),
                orders: [
                    {
                        orderId: faker.number.int(),
                        total: faker.number.float(),
                        date: faker.date.anytime(),
                        products: [
                            {
                                productId: faker.number.int(),
                                value: faker.number.float(),
                            },
                        ],
                    },
                ],
            }) as OrderSummary,
    );

describe('GetSummaryOrdersUseCase', () => {
    let orderRepositoryMock: IOrderRepository;
    let useCase: GetSummaryOrdersUseCase;

    beforeAll(() => {
        orderRepositoryMock = {
            saveOrders: jest.fn(),
            summaryByOrderIdOrStartDateOrEndDate: jest.fn(),
        };
        useCase = new GetSummaryOrdersUseCase(orderRepositoryMock);
    });

    it('should call repository with all filters and return results', async () => {
        const filters = {
            orderId: 123,
            startDate: faker.date.past(),
            endDate: faker.date.future(),
        };

        const mockSummaries = orderSummaryFactory(2);

        (
            orderRepositoryMock.summaryByOrderIdOrStartDateOrEndDate as jest.Mock
        ).mockResolvedValue(mockSummaries);

        const summaries = await useCase.execute(filters);

        expect(
            orderRepositoryMock.summaryByOrderIdOrStartDateOrEndDate,
        ).toHaveBeenCalledWith(
            filters.orderId,
            filters.startDate,
            filters.endDate,
        );
        expect(summaries).toEqual(mockSummaries);
    });

    it('should call repository with specific filters and return results', async () => {
        const filters = {
            startDate: faker.date.past(),
        };

        const mockSummaries = orderSummaryFactory(1);

        (
            orderRepositoryMock.summaryByOrderIdOrStartDateOrEndDate as jest.Mock
        ).mockResolvedValue(mockSummaries);

        const summaries = await useCase.execute(filters);

        expect(
            orderRepositoryMock.summaryByOrderIdOrStartDateOrEndDate,
        ).toHaveBeenCalledWith(undefined, filters.startDate, undefined);
        expect(summaries).toEqual(mockSummaries);
    });

    it('should return empty array if repository returns nothing', async () => {
        const filters = {
            orderId: 123,
            startDate: faker.date.past(),
            endDate: faker.date.future(),
        };

        (
            orderRepositoryMock.summaryByOrderIdOrStartDateOrEndDate as jest.Mock
        ).mockResolvedValue([]);

        const summaries = await useCase.execute(filters);

        expect(
            orderRepositoryMock.summaryByOrderIdOrStartDateOrEndDate,
        ).toHaveBeenCalledWith(
            filters.orderId,
            filters.startDate,
            filters.endDate,
        );
        expect(summaries).toEqual([]);
    });
});
