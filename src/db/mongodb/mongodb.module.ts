import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config: MongooseModuleFactoryOptions = {
          uri: configService.get<string>('MONGO_URI'),
        };
        return config;
      },
    }),
  ],
})
export class MongodbModule {}
