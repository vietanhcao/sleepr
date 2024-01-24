import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NetConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NetConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}
