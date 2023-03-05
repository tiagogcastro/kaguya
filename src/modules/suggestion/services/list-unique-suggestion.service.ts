import { ForbiddenException, Injectable } from '@nestjs/common';
import { InferType, date, number, object, string } from 'yup';

import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';

interface ListSuggestionsFromSuggestive {
  suggestionId?: string;
  suggestionSlug?: string;
}

@Injectable()
export class ListUniqueSuggestionService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute({ suggestionId, suggestionSlug }: ListSuggestionsFromSuggestive) {
    if(!suggestionId && !suggestionSlug) {
      throw new ForbiddenException({
        message: 'suggestionId or suggestionSlug is required',
      });
    }
      
    const foundSuggestions = await this.suggestionRepository.findSuggestionByIdOrSlug({
      id: suggestionId,
      slug: suggestionSlug,
    });

    return foundSuggestions;  
  }
}
