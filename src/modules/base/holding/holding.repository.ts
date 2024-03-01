import { BaseRepository } from '../../common/generic/base-repository';
import { Holding, HoldingDocument as EntityDocument } from './holding.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HoldingRepository extends BaseRepository<EntityDocument> {
  constructor(@InjectModel(Holding.name) holdingModel: Model<EntityDocument>) {
    super(holdingModel);
  }
}
