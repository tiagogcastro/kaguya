import { Injectable } from '@nestjs/common';
import { SuggestiveRepository } from '../infra/prisma/repositories/suggestive-repository';
import { SuggestiveModel } from '../model/suggestive.model';

@Injectable()
export class CreateSuggestiveService {
  constructor(private suggestiveRepository: SuggestiveRepository) {}

  async execute(suggestive: SuggestiveModel) {
    let { authUserId } = suggestive;

    let foundSuggestive = await this.suggestiveRepository.findSuggestiveBySuggestiveId(authUserId);

    if(!foundSuggestive) {
      foundSuggestive = await this.suggestiveRepository.createSuggestive(suggestive);
    }

    return foundSuggestive;
  }
}
