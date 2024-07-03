import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { UpdateJobInput as UpdateInput, CreateJobInput as CreateInput } from './dto';
import { Job } from './job.model';
import { JobService } from './job.service';

@UseGuards(AccessTokenGuard)
@Controller('job')
export class JobController {
    constructor(private readonly service: JobService) { }

    @Get()
    async findAll(@Param('select') select: string[]): Promise<Job[]> {
        return this.service.findAll({ select, where: {} });
    }

    @Post()
    async create(@Body() createInput: CreateInput): Promise<Job> {
        return this.service.create(createInput);
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Job> {
        return this.service.findOne({ id: id });
    }

    @Patch(":id")
    async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Job> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
