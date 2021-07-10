import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
require('dotenv').config();

const logger = new Logger('Analytics')

const microserviceOptions = {
    transport: Transport.REDIS,
    options: {
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD
    }
}

async function bootstrap() {
    // const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
    // await app.listen(() => {
    //     logger.log('Analytics Microservice is listening...');
    // });

    const app = await NestFactory.create(AppModule, { cors: true });
    app.connectMicroservice(microserviceOptions);

    await app.startAllMicroservicesAsync();
    await app.listen(process.env.PORT || 3011);
    // app.enableCors();
    logger.log('Analytics Microservice is listening...')
}
bootstrap();
