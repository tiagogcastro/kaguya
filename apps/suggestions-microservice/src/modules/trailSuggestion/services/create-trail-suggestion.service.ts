import { BadRequestException, Injectable } from '@nestjs/common';

import { SuggestionRepository } from '@modules/suggestion/infra/prisma/repositories/suggestion-repository';
import { TrailSuggestionModel } from '../model/trail-suggestion.model';
import { TrailSuggestionRepository } from '../infra/prisma/repositories/trail-suggestion-repository';
import slugify from 'slugify';

@Injectable()
export class CreateTrailSuggestionService {
  constructor(
    private trailSuggestionRepository: TrailSuggestionRepository,
    private suggestionRepository: SuggestionRepository
  ) {}

  async execute(trailSuggestion: TrailSuggestionModel) {
    const { title, suggestionId } = trailSuggestion;

    const foundSuggestion = await this.suggestionRepository.findSuggestionById(suggestionId);

    if(!foundSuggestion) {
      throw new BadRequestException("This suggestion does not exist to create a trail suggestion");
    }

    if (!trailSuggestion.slug) {
      trailSuggestion.slug = slugify(title, '-').toLowerCase();
    }

    let foundTrailSuggestion = await this.trailSuggestionRepository.findTrailSuggestionBySlug(trailSuggestion.slug);

    if(foundTrailSuggestion) {
      const randomHex = Math.floor(Math.random()*16777215).toString(16);

      trailSuggestion.slug = `${trailSuggestion.slug}-${randomHex}`;
    }

    const trailSuggestionCreated = await this.trailSuggestionRepository.createTrailSuggestion(trailSuggestion);

    return trailSuggestionCreated;
  }
}
