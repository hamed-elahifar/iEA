
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../common/guards';
import { CompanyService } from './company.service';
import { Company } from './company.model';
import { CreateCompanyInput as CreateInput } from './dto/create-company.input';
import { UpdateCompanyInput as UpdateInput } from './dto/update-company.input';

@ApiTags('Company')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('company')
export class CompanyController {
    constructor(private readonly service: CompanyService) { }

    @Get()
    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({ status: 200, description: 'Return all companies', type: [Company] })
    async findAll(@Param('select') select: string[]): Promise<Company[]> {
        return this.service.findAll({ where: {}, select });
    }

    @Post()
    @ApiOperation({ summary: 'Create a new company' })
    @ApiResponse({ status: 201, description: 'The company has been successfully created', type: Company }) async create(@Body() createInput: CreateInput): Promise<Company> {
        return this.service.create(createInput);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get a company by id' })
    @ApiResponse({ status: 200, description: 'Return the company', type: Company })
    @ApiResponse({ status: 404, description: 'Company not found' })
    async findOne(@Param('id') _id: string): Promise<Company> {
        return this.service.findOne({ _id });
    }

    @Patch(":id")
    @ApiOperation({ summary: 'Update a company' })
    @ApiResponse({ status: 200, description: 'The company has been successfully updated', type: Company })
    @ApiResponse({ status: 404, description: 'Company not found' })
    async update(@Param('id') _id: string, @Body() updateInput: UpdateInput): Promise<Company> {
        return this.service.update(_id, updateInput);
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete a company' })
    @ApiResponse({ status: 200, description: 'The company has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Company not found' })
    async remove(@Param('id') _id: string) {
        return this.service.delete(_id);
    }
}
