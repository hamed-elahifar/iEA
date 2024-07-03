import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { CreateStaffInput as CreateInput, UpdateStaffInput as UpdateInput } from './dto';
import { Staff } from './staff.model';
import { StaffService } from './staff.service';

@UseGuards(AccessTokenGuard)
@Controller('staff')
export class StaffController {
    constructor(private readonly service: StaffService) { }

    @Get()
    async findAll(@Param('select') select: string[]): Promise<Staff[]> {
        return this.service.findAll({ select, where: {} });
    }

    @Post()
    async create(@Body() createInput: CreateInput): Promise<Staff> {
        return this.service.create(createInput);
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Staff> {
        return this.service.findOne({ id: id });
    }

    @Patch(":id")
    async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Staff> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
