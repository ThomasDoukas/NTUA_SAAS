import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'

const logger = new Logger('Authentication')

const microserviceOptions = {
    transport: Transport.REDIS,
    options: {
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.connectMicroservice(microserviceOptions);

    await app.startAllMicroservicesAsync();
    await app.listen(process.env.PORT || 3010);
    logger.log('Authentication Microservice is listening...')
}
bootstrap();
