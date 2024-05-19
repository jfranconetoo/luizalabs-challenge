import { IOrderRepository } from '@domain/interfaces/order-repository.interface';
import { createInterface } from 'node:readline';
import { Order } from '@domain/entities/order.entity';
import { parse } from 'date-fns';

const batchSize = parseInt(process.env.BATCH_SIZE) || 1000;

export class ProcessFileAndBatchInsertUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(file: NodeJS.ReadableStream): Promise<void> {
        const rl = createInterface({
            input: file,
            crlfDelay: Infinity,
        });

        let batch = [];
        let lineNumber = 0;

        for await (const line of rl) {
            const order = this.processLineAndTransformToOrder(line);
            batch.push(order);
            lineNumber++;

            if (batch.length === batchSize) {
                await this.orderRepository.saveOrders(batch);
                batch = [];
            }
        }

        if (batch.length) {
            await this.orderRepository.saveOrders(batch);
        }

        console.log('All orders inserted to the database.');
    }

    private processLineAndTransformToOrder(line: string): Order {
        return new Order({
            userId: parseInt(line.substring(0, 10).trim()),
            name: line.substring(10, 55).trim(),
            orderId: parseInt(line.substring(55, 65).trim()),
            productId: parseInt(line.substring(65, 75).trim()),
            value: parseFloat(line.substring(75, 87)),
            date: parse(line.substring(87, 95).trim(), 'yyyyMMdd', new Date()),
        });
    }
}
