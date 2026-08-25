import { BadRequestException, Injectable } from '@nestjs/common';

import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';

interface ListUniqueSuggestionFromSuggestive {
  suggestiveId: string;
  suggestionSlug: string;
}

@Injectable()
export class ListUniqueSuggestionFromSuggestiveService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute({ suggestiveId, suggestionSlug }: ListUniqueSuggestionFromSuggestive) {
    const foundSuggestion = await this.suggestionRepository.findUniqueSuggestionFromSuggestiveId({
      suggestionSlug,
      suggestiveId
    });

    if(!foundSuggestion) {
      throw new BadRequestException("This suggestion does not exist in this account.");
    }

    return foundSuggestion;
  }
}
