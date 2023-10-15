import * as argon2 from 'argon2';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private config: ConfigService) {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      const prisma = new PrismaClient();

      const userCount = await prisma.user.count();

      if (userCount === 0) {
        await prisma.user.upsert({
          where: {
            email: this.config.get('ADMIN_EMAIL')
          },
          update: {},
          create: {
            email: this.config.get('ADMIN_EMAIL'),
            password: await argon2.hash(this.config.get('ADMIN_PASSWORD')),
            name: this.config.get('ADMIN_NAME'),
            isAdmin: true,
            isSuperAdmin: true
          }
        });
      }
    } catch (e) {
      throw e;
    }
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
