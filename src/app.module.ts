import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongodbModule } from './db/mongodb/mongodb.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production.local'],
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    MongodbModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
