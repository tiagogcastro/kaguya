import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';

interface ListSuggestionsFromSuggestive {
  suggestionSlug?: string;
}

@Injectable()
export class ListUniqueSuggestionService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute({ suggestionSlug }: ListSuggestionsFromSuggestive) {
    if(!suggestionSlug) {
      throw new ForbiddenException({
        message: 'suggestionSlug is required',
      });
    }
      
    const foundSuggestion = await this.suggestionRepository.findSuggestionBySlug(suggestionSlug);

    if(!foundSuggestion) {
      throw new BadRequestException({
        message: 'This suggestion does not exist',
      });
    }

    return foundSuggestion;  
  }
}
