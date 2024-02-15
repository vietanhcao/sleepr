import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ModelDefinition,
  MongooseModule,
  MongooseModuleAsyncOptions,
} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
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
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }

  static forRootAsync(options: MongooseModuleAsyncOptions) {
    return MongooseModule.forRootAsync(options);
  }
}
