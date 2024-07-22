
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../common/guards';
import { CompanyService } from './company.service';
import { Company } from './company.model';
import { CreateCompanyInput as CreateInput } from './dto/create-company.input';
import { UpdateCompanyInput as UpdateInput } from './dto/update-company.input';

@UseGuards(AccessTokenGuard)
@Controller('company')
export class CompanyController {
    constructor(private readonly service: CompanyService) { }

    @Get()
    async findAll(@Param('select') select: string[]): Promise<Company[]> {
        return this.service.findAll({ where: {}, select });
    }

    @Post()
    async create(@Body() createInput: CreateInput): Promise<Company> {
        return this.service.create(createInput);
    }

    @Get(":id")
    async findOne(@Param('id') _id: string): Promise<Company> {
        return this.service.findOne({ _id });
    }

    @Patch(":id")
    async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Company> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
