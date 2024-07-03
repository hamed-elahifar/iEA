import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { CreateActivityInput as CreateInput, UpdateActivityInput as UpdateInput } from './dto/';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';

@UseGuards(AccessTokenGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly service: ActivityService) { }

  @Get()
  async findAll(@Param('select') select: string[]): Promise<Activity[]> {
    return this.service.findAll({ where: {}, select });
  }

  @Post()
  async create(@Body() createInput: CreateInput): Promise<Activity> {
    return this.service.create(createInput);
  }

  @Get(":id")
  async findOne(@Param('id') _id: string): Promise<Activity> {
    return this.service.findOne({ _id });
  }

  @Patch(":id")
  async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Activity> {
    return this.service.update(_id, updateInput);
  }

  @Delete(":id")
  async remove(@Param('id') _id: string) {
    return this.service.delete(_id);
  }
}
