import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from './department.repository';
import { Company, CompanyDocument, CompanyRepository } from '../companies';
import { Staff, StaffDocument, StaffRepository } from '../staffs';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { DepartmentDocument } from './department.model';

describe('DepartmentService', () => {
    let service: DepartmentService;
    let departmentRepository: jest.Mocked<DepartmentRepository>;
    let companyRepository: jest.Mocked<CompanyRepository>;
    let staffRepository: jest.Mocked<StaffRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DepartmentService,
                {
                    provide: DepartmentRepository,
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        findAll: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: CompanyRepository,
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: StaffRepository,
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<DepartmentService>(DepartmentService);
        departmentRepository = module.get(DepartmentRepository) as jest.Mocked<DepartmentRepository>;
        companyRepository = module.get(CompanyRepository) as jest.Mocked<CompanyRepository>;
        staffRepository = module.get(StaffRepository) as jest.Mocked<StaffRepository>;
    });

    describe('create', () => {
        it('should create a department successfully', async () => {
            const createInput = {
                title: 'Test Department',
                company: 'companyId',
                supervisor: 'supervisorId',
            };
            const company: Partial<CompanyDocument> = {
                _id: 'companyId',
                name: 'Test Company',
                mission: 'Test Mission',
                vision: 'Test Vision',
                children: [],
            };
            const supervisor: Partial<StaffDocument> = {
                _id: 'supervisorId',
                username: 'testuser',
                job: 'Manager',
                company: { _id: 'companyId' } as Company,
                createdAt: new Date(),
                updatedAt: new Date(),

            };
            const createdDepartment: Partial<DepartmentDocument> = {
                _id: 'departmentId',
                title: 'Test Department',
                company: { _id: 'companyId' } as Company,
                supervisor: { _id: 'supervisorId' } as Staff,
                children: [],
                members: [{ _id: 'memberId' } as Staff],
                createdAt: new Date(),
                updatedAt: new Date(),
            };


            companyRepository.findOne.mockResolvedValue(company as CompanyDocument); departmentRepository.findOne.mockResolvedValue(null);
            staffRepository.findOne.mockResolvedValue(supervisor as StaffDocument);
            departmentRepository.create.mockResolvedValue(createdDepartment as DepartmentDocument);


            const result = await service.create(createInput);

            expect(result).toEqual(createdDepartment);
            expect(companyRepository.findOne).toHaveBeenCalledWith({ _id: createInput.company });
            expect(departmentRepository.findOne).toHaveBeenCalledWith({ title: createInput.title, company: createInput.company });
            expect(staffRepository.findOne).toHaveBeenCalledWith({ _id: createInput.supervisor });
            expect(departmentRepository.create).toHaveBeenCalledWith(createInput);
        });

        it('should throw NotFoundException if company not found', async () => {
            const createInput = {
                title: 'Test Department',
                company: 'nonExistentCompanyId',
                supervisor: 'supervisorId',
            };

            companyRepository.findOne.mockResolvedValue(null);

            await expect(service.create(createInput)).rejects.toThrow(NotFoundException);
        });

        // Add more test cases for other scenarios
    });

});

