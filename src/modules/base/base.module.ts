import { Module } from '@nestjs/common';
import { ActivityResolver } from './activities/activity.resolver';
import { ActivityService } from './activities/activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activities/activity.model';
import { Company, CompanySchema } from './companies/company.model';
import { Staff, StaffSchema } from './staffs/staff.model';
import { Department, DepartmentSchema } from './departments/department.model';
import { CompanyResolver } from './companies/company.resolver';
import { CompanyService } from './companies/company.service';
import { ActivityCompanyResolver } from './activities/activity-company.resolver';
import {
  JobPosition,
  JobPositionSchema,
} from './job-positions/job-position.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Activity.name,
        schema: ActivitySchema,
      },
      {
        name: Company.name,
        schema: CompanySchema,
      },
      {
        name: JobPosition.name,
        schema: JobPositionSchema,
      },
      {
        name: Staff.name,
        schema: StaffSchema,
      },
      {
        name: Department.name,
        schema: DepartmentSchema,
      },
    ]),
  ],
  providers: [
    ActivityResolver,
    ActivityCompanyResolver,
    ActivityService,
    CompanyResolver,
    CompanyService,
  ],
})
export class BaseModule {}
