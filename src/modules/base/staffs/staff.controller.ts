import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { CreateStaffInput as CreateInput, UpdateStaffInput as UpdateInput } from './dto';
import { Staff } from './staff.model';
import { StaffService } from './staff.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Staff')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('staff')
export class StaffController {
    constructor(private readonly service: StaffService) { }

    @Get()
    @ApiOperation({ summary: 'Get all staff' })
    @ApiResponse({ status: 200, description: 'Return all staff members', type: [Staff] })
    async findAll(@Param('select') select: string[]): Promise<Staff[]> {
        return this.service.findAll({ select, where: {} });
    }

    @Post()
    @ApiOperation({ summary: 'Create a new staff member' })
    @ApiResponse({ status: 201, description: 'The staff member has been successfully created', type: Staff })
    async create(@Body() createInput: CreateInput): Promise<Staff> {
        return this.service.create(createInput);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get a staff member by id' })
    @ApiResponse({ status: 200, description: 'Return the staff member', type: Staff })
    @ApiResponse({ status: 404, description: 'Staff member not found' })
    async findOne(@Param('id') id: string): Promise<Staff> {
        return this.service.findOne({ id: id });
    }

    @Patch(":id")
    @ApiOperation({ summary: 'Update a staff member' })
    @ApiResponse({ status: 200, description: 'The staff member has been successfully updated', type: Staff })
    @ApiResponse({ status: 404, description: 'Staff member not found' })
    async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Staff> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete a staff member' })
    @ApiResponse({ status: 200, description: 'The staff member has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Staff member not found' }) 
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
