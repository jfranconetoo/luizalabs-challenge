import { AppModule } from '@infrastructure/nestjs/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppCluster } from './cluster';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );
    await app.listen(3000);
}

const appCluster = new AppCluster(2);
appCluster.initialize(bootstrap);
