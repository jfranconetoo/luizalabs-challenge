import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/entities/order.entity';

export const configModules = [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            type: 'mongodb',
            url: configService.get('DB_URL'),
            database: configService.get('DB_NAME', 'llabs'),
            entities: [OrderEntity],
            synchronize: false,
        }),
        inject: [ConfigService],
    }),
];
