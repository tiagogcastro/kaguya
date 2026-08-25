import { Injectable } from '@nestjs/common';

import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';

interface ListSuggestionsFromSuggestive {
  suggestiveId: string;
}

@Injectable()
export class ListSuggestionsFromSuggestiveService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute({ suggestiveId }: ListSuggestionsFromSuggestive) {
    const foundSuggestions = await this.suggestionRepository.findManySuggestionsBySuggestiveId(suggestiveId);

    return foundSuggestions;
  }
}
