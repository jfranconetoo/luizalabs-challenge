import { Order } from '@domain/entities/order.entity';
import { IOrderRepository } from '@domain/interfaces/order-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { AnyBulkWriteOperation, MongoRepository, ObjectLiteral } from 'typeorm';
import { OrderSummary } from '@domain/entities/order-summary';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private ordersRepository: MongoRepository<OrderEntity>,
    ) {}

    async saveOrders(orders: Order[]): Promise<void> {
        const bulkOperations: AnyBulkWriteOperation[] = orders.map((order) => ({
            updateMany: {
                filter: {
                    userId: order.userId,
                    orderId: order.orderId,
                    productId: order.productId,
                    value: order.value,
                },
                update: { $set: order },
                upsert: true,
            },
        }));
        await this.ordersRepository.bulkWrite(bulkOperations);
    }

    async summaryByOrderIdOrStartDateOrEndDate(
        orderId?: number,
        startDate?: Date,
        endDate?: Date,
    ): Promise<OrderSummary[]> {
        const pipeline: ObjectLiteral[] = [];
        const $match: ObjectLiteral = {};

        if (orderId) {
            Object.assign($match, {
                orderId,
            });
        }

        if (startDate && endDate) {
            Object.assign($match, {
                date: { $gte: startDate, $lte: endDate },
            });
        } else {
            if (startDate) {
                Object.assign($match, {
                    date: { $gte: startDate },
                });
            }

            if (endDate) {
                Object.assign($match, {
                    date: { $lte: endDate },
                });
            }
        }

        pipeline.push({ $match });
        pipeline.push(
            {
                $group: {
                    _id: {
                        userId: '$userId',
                        orderId: '$orderId',
                    },
                    name: {
                        $first: '$name',
                    },
                    raws: {
                        $addToSet: '$$ROOT',
                    },
                    products: {
                        $push: {
                            productId: '$productId',
                            value: '$value',
                        },
                    },
                },
            },
            {
                $group: {
                    _id: {
                        userId: '$_id.userId',
                    },
                    userId: {
                        $first: '$_id.userId',
                    },
                    name: {
                        $first: '$name',
                    },
                    orders: {
                        $addToSet: {
                            date: {
                                $first: '$raws.date',
                            },
                            total: {
                                $sum: '$products.value',
                            },
                            orderId: '$_id.orderId',
                            products: '$products',
                        },
                    },
                },
            },
            {
                $project: {
                    _id: false,
                },
            },
        );
        const result = await this.ordersRepository
            .aggregate(pipeline)
            .toArray();
        return result.map((item) => plainToInstance(OrderSummary, item));
    }
}
