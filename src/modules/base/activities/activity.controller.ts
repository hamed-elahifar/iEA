import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../common/guards';
import { CreateActivityInput as CreateInput, UpdateActivityInput as UpdateInput } from './dto/';
import { Activity } from './activity.model';
import { ActivityService } from './activity.service';

@ApiTags('Activity')
@UseGuards(AccessTokenGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly service: ActivityService) { }

  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  @ApiResponse({ status: 200, description: 'Return all activities', type: [Activity] })
  async findAll(@Param('select') select: string[]): Promise<Activity[]> {
    return this.service.findAll({ where: {}, select });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new activity' })
  @ApiBody({ type: CreateInput })
  @ApiResponse({ status: 201, description: 'The activity has been successfully created', type: Activity })
  async create(@Body() createInput: CreateInput): Promise<Activity> {
    return this.service.create(createInput);
  }

  @Get(":id")
  @ApiOperation({ summary: 'Get a single activity' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the activity', type: Activity })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  async findOne(@Param('id') _id: string): Promise<Activity> {
    return this.service.findOne({ _id });
  }

  @Patch(":id")
  @ApiOperation({ summary: 'Update an activity' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateInput })
  @ApiResponse({ status: 200, description: 'The activity has been successfully updated', type: Activity })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Activity> {
    return this.service.update(_id, updateInput);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete an activity' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'The activity has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  async remove(@Param('id') _id: string) {
    return this.service.delete(_id);
  }
}
