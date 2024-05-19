import { OrderSummaryFiltersDto } from '@application/facades/dtos/order-summary-filters.dto';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'endDateGreaterThanStartDate', async: false })
export class EndDateGreaterThanStartDateConstraint
    implements ValidatorConstraintInterface
{
    validate(value: any, args: ValidationArguments) {
        const { startDate } = args.object as OrderSummaryFiltersDto;
        if (!startDate || !value) {
            return true; // Validation passes if either startDate or endDate is not provided
        }
        return value > startDate; // Validation passes if endDate is greater than startDate
    }

    defaultMessage(args: ValidationArguments) {
        return 'End date must be greater than start date';
    }
}
