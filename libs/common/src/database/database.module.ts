import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_URI');
        const database = configService.get('MONGO_DATABASE');
        return {
          uri,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
