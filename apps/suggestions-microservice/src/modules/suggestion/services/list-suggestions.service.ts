import { Injectable } from '@nestjs/common';

import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';

@Injectable()
export class ListSuggestionsService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute() {
    const foundSuggestions = await this.suggestionRepository.findManySuggestions();

    return foundSuggestions;
  }
}
