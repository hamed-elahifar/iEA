import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { getModelToken } from '@nestjs/mongoose';
import { Company } from '../companies';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { TypeEnum } from './enums/group-type.unum';

describe('ActivityService', () => {
    let activityService: ActivityService;
    let companyRepository: any;
    let repository: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ActivityService,
                {
                    provide: getModelToken(Company.name),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: getModelToken('Activity'),
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        activityService = module.get<ActivityService>(ActivityService);
        companyRepository = module.get(getModelToken(Company.name));
        repository = module.get(getModelToken('Activity'));
    });

    describe('create', () => {
        it('should create an activity when company exists', async () => {
            const createInput = { company: 'companyId', name: 'Test Activity', title: 'test title', type: TypeEnum.CONTROL };
            const mockCompany = { _id: 'companyId', name: 'Test Company' };
            const mockActivity = { ...createInput, _id: 'activityId' };

            companyRepository.findOne.mockResolvedValue(mockCompany);
            repository.create.mockResolvedValue(mockActivity);

            const result = await activityService.create(createInput);

            expect(result).toEqual(mockActivity);
            expect(companyRepository.findOne).toHaveBeenCalledWith({ _id: 'companyId' });
            expect(repository.create).toHaveBeenCalledWith(createInput);
        });

        it('should throw NotFoundException when company does not exist', async () => {
            const createInput = { company: 'nonExistentCompanyId', name: 'Test Activity', title: 'test title', type: TypeEnum.CONTROL };

            companyRepository.findOne.mockResolvedValue(null);

            await expect(activityService.create(createInput)).rejects.toThrow(NotFoundException);
            expect(companyRepository.findOne).toHaveBeenCalledWith({ _id: 'nonExistentCompanyId' });
        });

        it('should throw ConflictException when activity already exists', async () => {
            const createInput = { company: 'companyId', name: 'Existing Activity', title: 'test title', type: TypeEnum.CONTROL };
            const mockCompany = { _id: 'companyId', name: 'Test Company' };

            companyRepository.findOne.mockResolvedValue(mockCompany);
            repository.create.mockRejectedValue({ code: 11000 });

            await expect(activityService.create(createInput)).rejects.toThrow(ConflictException);
            expect(companyRepository.findOne).toHaveBeenCalledWith({ _id: 'companyId' });
            expect(repository.create).toHaveBeenCalledWith(createInput);
        });
    });
});
