import {
    Controller,
    Get,
    Inject,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ORDER_FACADE } from '../app.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'node:stream';
import { IOrderFacade } from '@application/facades/interfaces/order-facade';
import { OrderSummary } from '@domain/entities/order-summary';
import { OrderValidatedSummaryFiltersDto } from './dtos/order-validate-summary-filters.dto';

@Controller('orders')
export class OrderController {
    constructor(@Inject(ORDER_FACADE) private orderFacade: IOrderFacade) {}

    @Get()
    async getOrders(
        @Query()
        filters: OrderValidatedSummaryFiltersDto,
    ): Promise<OrderSummary[]> {
        return this.orderFacade.getSummaryOrders(filters);
    }

    @Post('/process-file')
    @UseInterceptors(FileInterceptor('file'))
    async processFileAndBatchInsert(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<void> {
        const fileStream = Readable.from(file.buffer);
        return this.orderFacade.processFileAndBatchInsert(fileStream);
    }
}
