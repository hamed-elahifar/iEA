import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../common/guards';
import { CreateDepartmentInput as CreateInput, CreateDepartmentInput as UpdateInput } from './dto';
import { Department } from './department.model';
import { DepartmentService } from './department.service';

@ApiTags('Department')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('department')
export class DepartmentController {
    constructor(private readonly service: DepartmentService) { }

    @Get()
    @ApiOperation({ summary: 'Get all departments' })
    @ApiResponse({ status: 200, description: 'Return all departments', type: [Department] })
    async findAll(@Param('select') select: string[]): Promise<Department[]> {
        return this.service.findAll({ select, where: {} });
    }

    @Post()
    @ApiOperation({ summary: 'Create a new department' })
    @ApiResponse({ status: 201, description: 'The department has been successfully created', type: Department })
    async create(@Body() createInput: CreateInput): Promise<Department> {
        return this.service.create(createInput);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get a department by id' })
    @ApiResponse({ status: 200, description: 'Return the department', type: Department })
    @ApiResponse({ status: 404, description: 'Department not found' })
    async findOne(@Param('id') id: string): Promise<Department> {
        return this.service.findOne({ id: id });
    }

    @Patch(":id")
    @ApiOperation({ summary: 'Update a department' })
    @ApiResponse({ status: 200, description: 'The department has been successfully updated', type: Department })
    @ApiResponse({ status: 404, description: 'Department not found' }) async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Department> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete a department' })
    @ApiResponse({ status: 200, description: 'The department has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Department not found' })
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
