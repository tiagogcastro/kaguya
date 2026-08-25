import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';
import { SuggestionModel } from '../model/suggestion.model';

@Injectable()
export class CreateSuggestionService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute(suggestion: SuggestionModel) {
    const { title } = suggestion;

    if (!suggestion.slug) {
      suggestion.slug = slugify(title, '-').toLowerCase();
    }

    const foundSuggestion =
      await this.suggestionRepository.findSuggestionBySlug(suggestion.slug);

    if (foundSuggestion) {
      const randomHex = Math.floor(Math.random() * 16777215).toString(16);

      suggestion.slug = `${suggestion.slug}-${randomHex}`;
    }

    return this.suggestionRepository.createSuggestion(suggestion);
  }
}
