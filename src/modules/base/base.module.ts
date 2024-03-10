import { Module } from '@nestjs/common';
import { ActivityResolver } from './activities/activity.resolver';
import { ActivityService } from './activities/activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activities/activity.model';
import { Department, DepartmentSchema } from './departments/department.model';
import { Company, CompanySchema } from './companies/company.model';
import { Holding, HoldingSchema } from './holding/holding.model';
import { Staff, StaffSchema } from './staffs/staff.model';
import {
  JobPosition,
  JobPositionSchema,
} from './job-positions/job-position.model';
import { CompanyRepository } from './companies/company.repository';
import { HoldingRepository } from './holding/holding.repository';
import { CompanyResolver } from './companies/company.resolver';
import { CompanyService } from './companies/company.service';
import { ActivityCompanyResolver } from './activities/activity-company.resolver';
import { ActivityRepository } from './activities/activity.repository';
import { HoldingService } from './holding/holding.service';
import { HoldingResolver } from './holding/holding.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../auth/config/jwt.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
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
        name: Holding.name,
        schema: HoldingSchema,
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
    ActivityRepository,
    CompanyResolver,
    CompanyService,
    CompanyRepository,
    HoldingRepository,
    HoldingService,
    HoldingResolver,
  ],
})
export class BaseModule {}
