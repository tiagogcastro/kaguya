import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { TrailSuggestionModel } from '@modules/trailSuggestion/model/trail-suggestion.model';

@Injectable()
export class TrailSuggestionRepository {
  constructor(private prisma: PrismaService) {}

  async createTrailSuggestion(data: TrailSuggestionModel) {
    return this.prisma.trailSuggestion.create({
      data,
      include: {
        suggestion: true,
      }
    });
  }

  async deleteTrailSuggestionWithSlug(trailSuggestionSlug: string) {
    await this.prisma.trailSuggestion.delete({
      where: {
        slug: trailSuggestionSlug
      }
    });
  }

  async findManyTrailSuggestionsBySuggestionId(suggestionId: string) {
    return this.prisma.trailSuggestion.findMany({
      where: {
        suggestionId
      },
      include: {
        suggestion: true
      }
    });
  }

  async findUniqueTrailSuggestionFromSuggestionId({ trailSuggestionSlug, suggestionId }: { suggestionId: string, trailSuggestionSlug: string }) {
    return this.prisma.trailSuggestion.findFirst({
      where: {
        suggestionId,
        slug: trailSuggestionSlug
      },
      include: {
        suggestion: true
      }
    });
  }

  async findTrailSuggestionBySlug(slug: string) {
    return this.prisma.trailSuggestion.findFirst({
      where: {
        slug 
      },
      include: {
        suggestion: true,
      }
    });
  }

  async findTrailSuggestionById(id: string) {
    return this.prisma.trailSuggestion.findFirst({
      where: {
        id 
      },
      include: {
        suggestion: true,
      }
    });
  }

  async findTrailSuggestionByIdOrSlug({id, slug}: {id: string, slug: string}) {
    return this.prisma.trailSuggestion.findFirst({
      where: {
        OR: [
          {
            id
          },
          {
            slug
          }
        ]
      },
      include: {
        suggestion: true
      }
    });
  }

  async findManyTrailSuggestions() {
    return this.prisma.trailSuggestion.findMany({
      include: {
        suggestion: true
      }
    });
  }
}