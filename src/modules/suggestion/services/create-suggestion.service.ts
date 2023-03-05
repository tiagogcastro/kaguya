import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { SuggestionRepository } from '../infra/prisma/repositories/suggestion-repository';
import { SuggestionModel } from '../model/suggestion.model';

@Injectable()
export class CreateSuggestionService {
  constructor(private suggestionRepository: SuggestionRepository) {}

  async execute(suggestion: SuggestionModel) {
    let { slug, title } = suggestion;

    const titleSlug = slugify(title, '-').toLowerCase();
    
    if(!slug) {
      suggestion.slug = titleSlug;
    }

    let foundSuggestion = await this.suggestionRepository.findSuggestionBySlug(suggestion.slug);

    if(foundSuggestion) {
      const randomHex = Math.floor(Math.random()*16777215).toString(16);

      suggestion.slug = `${suggestion.slug}-${randomHex}`;
    }

    const suggestionCreated = await this.suggestionRepository.createSuggestion(suggestion);

    return suggestionCreated;
  }
}
