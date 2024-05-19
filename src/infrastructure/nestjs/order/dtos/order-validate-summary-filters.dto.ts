import { OrderSummaryFiltersDto } from '@application/facades/dtos/order-summary-filters.dto';
import {
    IsDate,
    IsDateString,
    IsNumber,
    IsOptional,
    Validate,
} from 'class-validator';
import { EndDateGreaterThanStartDateConstraint } from './validators/end-date-greater-than-start-date-constraint';

export class OrderValidatedSummaryFiltersDto implements OrderSummaryFiltersDto {
    @IsOptional()
    @IsNumber()
    orderId: number;
    @IsOptional()
    @IsDate()
    startDate: Date;
    @IsOptional()
    @IsDate()
    @Validate(EndDateGreaterThanStartDateConstraint)
    endDate: Date;
}
