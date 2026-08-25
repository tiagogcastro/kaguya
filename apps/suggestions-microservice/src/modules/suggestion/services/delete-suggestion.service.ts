import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { Injectable } from '@nestjs/common';
import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';

interface DeleteSuggestionData {
  suggestionSlug: string;

  suggestiveId: string;
}

@Injectable()
export class DeleteSuggestionService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute({ suggestiveId, suggestionSlug}: DeleteSuggestionData) {
    if(!suggestionSlug) {
      throw new ForbiddenException({
        message: 'suggestionSlug is required',
      });
    }

    const foundSuggestion = await this.suggestionRepository.findSuggestionBySlug(suggestionSlug);

    if(!foundSuggestion) {
      throw new BadRequestException("Suggestion does not exist");
    }

    await this.suggestionRepository.deleteSuggestionWithSlug(suggestionSlug);

    return null
  }
}
