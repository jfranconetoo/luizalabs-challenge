import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { configModules } from './config/config-modules';

@Module({
    imports: [...configModules, OrderModule],
    controllers: [AppController],
})
export class AppModule {}
