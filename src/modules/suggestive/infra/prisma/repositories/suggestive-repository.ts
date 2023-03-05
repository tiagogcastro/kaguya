import { SuggestiveModel } from '@modules/suggestive/model/suggestive.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class SuggestiveRepository {
  constructor(private prisma: PrismaService) {}

  async createSuggestive(data: SuggestiveModel) {
    const { authUserId, email, username, avatar, name } = data;

    return this.prisma.suggestives.create({
      data: {
        authUserId, 
        email, 
        username, 
        avatar, 
        name,
      }
    });
  }

  async findSuggestiveBySuggestiveId(suggestiveId: string) {
    return this.prisma.suggestives.findFirst({
      where: {
        authUserId: suggestiveId 
      }
    });
  }

  async findSuggestiveByEmail(email: string) {
    return this.prisma.suggestives.findFirst({
      where: {
        email
      }
    });
  }

  async findSuggestiveById(id: string) {
    return this.prisma.suggestives.findFirst({
      where: {
        id 
      }
    });
  }

  async findSuggestiveByUsername(username: string) {
    return this.prisma.suggestives.findFirst({
      where: {
        username 
      }
    });
  }
}