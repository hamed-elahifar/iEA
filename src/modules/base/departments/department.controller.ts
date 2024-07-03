import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { CreateDepartmentInput as CreateInput, CreateDepartmentInput as UpdateInput } from './dto';
import { Department } from './department.model';
import { DepartmentService } from './department.service';

@UseGuards(AccessTokenGuard)
@Controller('department')
export class DepartmentController {
    constructor(private readonly service: DepartmentService) { }

    @Get()
    async findAll(@Param('select') select: string[]): Promise<Department[]> {
        return this.service.findAll({ select, where: {} });
    }

    @Post()
    async create(@Body() createInput: CreateInput): Promise<Department> {
        return this.service.create(createInput);
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Department> {
        return this.service.findOne({ id: id });
    }

    @Patch(":id")
    async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Department> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
