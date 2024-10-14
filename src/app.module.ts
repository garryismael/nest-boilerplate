import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './db/postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

@Module({
  imports: [
    PostgresModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production.local'],
      load: [configuration],
    }),
    PostgresModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
