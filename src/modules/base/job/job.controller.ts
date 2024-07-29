import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { UpdateJobInput as UpdateInput, CreateJobInput as CreateInput } from './dto';
import { Job } from './job.model';
import { JobService } from './job.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Job')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('job')
export class JobController {
    constructor(private readonly service: JobService) { }

    @Get()
    @ApiOperation({ summary: 'Get all jobs' })
    @ApiResponse({ status: 200, description: 'Return all jobs', type: [Job] })
    async findAll(@Param('select') select: string[]): Promise<Job[]> {
        return this.service.findAll({ select, where: {} });
    }

    @Post()
    @ApiOperation({ summary: 'Create a new job' })
    @ApiResponse({ status: 201, description: 'The job has been successfully created', type: Job })
    async create(@Body() createInput: CreateInput): Promise<Job> {
        return this.service.create(createInput);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get a job by id' })
    @ApiResponse({ status: 200, description: 'Return the job', type: Job })
    @ApiResponse({ status: 404, description: 'Job not found' })
    async findOne(@Param('id') id: string): Promise<Job> {
        return this.service.findOne({ id: id });
    }

    @Patch(":id")
    @ApiOperation({ summary: 'Update a job' })
    @ApiResponse({ status: 200, description: 'The job has been successfully updated', type: Job })
    @ApiResponse({ status: 404, description: 'Job not found' })
    async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Job> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete a job' })
    @ApiResponse({ status: 200, description: 'The job has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Job not found' })
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
