import { createInterface } from 'node:readline';
import { ProcessFileAndBatchInsertUseCase } from './process-file-and-batch-insert.usecase';
import { IOrderRepository } from '@domain/interfaces/order-repository.interface';

jest.mock('node:readline');

describe('ProcessFileAndBatchInsertUseCase', () => {
    let orderRepositoryMock: IOrderRepository;
    let useCase: ProcessFileAndBatchInsertUseCase;

    beforeAll(() => {
        orderRepositoryMock = {
            saveOrders: jest.fn(),
            summaryByOrderIdOrStartDateOrEndDate: jest.fn(),
        };

        (createInterface as jest.Mock).mockReturnValue({
            on: jest.fn(),
            [Symbol.asyncIterator]: async function* () {
                yield '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308';
                yield '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116';
                yield '0000000049                               Ken Wintheiser00000005230000000003      586.7420210903';
                yield '0000000049                               Ken Wintheiser00000005230000000004      100.0020210903';
            },
        });

        useCase = new ProcessFileAndBatchInsertUseCase(orderRepositoryMock);
    });

    it('should process the file line by line and save orders in batches', async () => {
        const mockFile = {
            on: jest.fn(),
        };

        await useCase.execute(mockFile as any);

        expect(createInterface).toHaveBeenCalledWith({
            input: mockFile,
            crlfDelay: Infinity,
        });
        expect(orderRepositoryMock.saveOrders).toHaveBeenCalledTimes(2);
    });
});
