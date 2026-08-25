import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { SuggestionModel } from '@modules/suggestion/model/suggestion.model';

@Injectable()
export class SuggestionRepository {
  constructor(private prisma: PrismaService) {}

  async createSuggestion(data: SuggestionModel) {
    return this.prisma.suggestion.create({
      data,
      include: {
        suggestive: true,
        trailSuggestion: true,
      }
    });
  }

  async deleteSuggestionWithSlug(suggestionSlug: string) {
    await this.prisma.suggestion.delete({
      where: {
        slug: suggestionSlug
      }
    });
  }

  async findManySuggestionsBySuggestiveId(suggestiveId: string) {
    return this.prisma.suggestion.findMany({
      where: {
        suggestiveId
      },
      include: {
        suggestive: true,
        trailSuggestion: true,
      }
    });
  }

  async findUniqueSuggestionFromSuggestiveId({ suggestionSlug, suggestiveId }: { suggestiveId: string, suggestionSlug: string }) {
    return this.prisma.suggestion.findFirst({
      where: {
        suggestiveId,
        slug: suggestionSlug
      },
      include: {
        suggestive: true,
        trailSuggestion: true,
      }
    });
  }

  async findSuggestionBySlug(slug: string) {
    return this.prisma.suggestion.findFirst({
      where: {
        slug 
      },
      include: {
        suggestive: true,
        trailSuggestion: true,
      }
    });
  }

  async findSuggestionById(id: string) {
    return this.prisma.suggestion.findFirst({
      where: {
        id 
      },
      include: {
        suggestive: true,
        trailSuggestion: true,
      }
    });
  }

  async findManySuggestions() {
    return this.prisma.suggestion.findMany({
      include: {
        suggestive: true,
        trailSuggestion: true,
      }
    });
  }
}