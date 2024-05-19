import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ORDER_FACADE } from '../app.constants';
import { ProcessFileAndBatchInsertUseCase } from '@domain/usecases/process-file-and-batch-insert/process-file-and-batch-insert.usecase';
import { OrderRepositoryImpl } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderFacadeImpl } from '@application/facades/order.facade';
import { GetSummaryOrdersUseCase } from '@domain/usecases/get-summary-orders/get-summary-orders.usecase';

@Module({
    controllers: [OrderController],
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    providers: [
        OrderRepositoryImpl,
        {
            provide: ORDER_FACADE,
            inject: [OrderRepositoryImpl],
            useFactory: (orderRepositoryImpl: OrderRepositoryImpl) => {
                const processFileAndBatchInsertUseCase =
                    new ProcessFileAndBatchInsertUseCase(orderRepositoryImpl);

                const getSummaryOrdersUseCase = new GetSummaryOrdersUseCase(
                    orderRepositoryImpl,
                );
                const orderControllerImpl = new OrderFacadeImpl(
                    processFileAndBatchInsertUseCase,
                    getSummaryOrdersUseCase,
                );

                return orderControllerImpl;
            },
        },
    ],
})
export class OrderModule {}
