import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import {User} from '../users/user.entity';
import { ApiModule } from '../api/api.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'gergel',
      password: 'gergel',
      database: 'gergel',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
