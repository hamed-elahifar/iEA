import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Company,
  CompanySchema,
  CompanyRepository,
  CompanyResolver,
  CompanyService,
} from './companies';
import { ActivityRepository } from './activities/activity.repository';
import {
  Holding,
  HoldingSchema,
  HoldingRepository,
  HoldingService,
  HoldingResolver,
} from './holding';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../auth/config/jwt.config';
import {
  Department,
  DepartmentSchema,
  DepartmentResolver,
  DepartmentService,
  DepartmentRepository,
} from './departments';
import {
  Staff,
  StaffSchema,
  StaffRepository,
  StaffResolver,
  StaffService,
} from './staffs';
import {
  Activity,
  ActivityCompanyResolver,
  ActivityResolver,
  ActivitySchema,
  ActivityService,
} from './activities';
import {
  JobPosition,
  JobPositionSchema,
  JobPositionRepository,
  JobPositionResolver,
  JobPositionService,
} from './job-positions';

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
    DepartmentResolver,
    DepartmentService,
    DepartmentRepository,
    StaffResolver,
    StaffService,
    StaffRepository,
    JobPositionResolver,
    JobPositionService,
    JobPositionRepository,
  ],
})
export class BaseModule {}
