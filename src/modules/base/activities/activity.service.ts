import { Injectable } from '@nestjs/common';
import { CreateActivityInput } from './dto/create-activity.input';

@Injectable()
export class ActivityService {
  async findAll() {
    return [];
  }

  async findOne(id: string) {
    return null;
  }

  async create(createActivityInput: CreateActivityInput) {
    return null;
  }
}
