import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import {LoggerMiddleware} from './common/middlewares/logger.middleware'
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), ChatsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  private readonly isDev = process.env.MODE === 'dev'
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
    mongoose.set('debug', this.isDev)
  }
}

