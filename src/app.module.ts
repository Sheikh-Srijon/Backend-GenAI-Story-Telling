import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';

import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/api/auth/auth.module';
import { UserProxy } from '@/shared/async-storage';

import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ClsModule.forFeature(UserProxy),
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
