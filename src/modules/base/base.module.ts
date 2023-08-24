import { Module } from '@nestjs/common';
import { ActivityResolver } from './activities/activity.resolver';
import { ActivityService } from './activities/activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activities/activity.model';
import { Company, CompanySchema } from './companies/company.model';
import { Position, PositionSchema } from './positions/position.model';
import { Personnel, PersonnelSchema } from './personnels/personnel.model';
import { Unit, UnitSchema } from './units/unit.model';

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
        name: Position.name,
        schema: PositionSchema,
      },
      {
        name: Personnel.name,
        schema: PersonnelSchema,
      },
      {
        name: Unit.name,
        schema: UnitSchema,
      },
    ]),
  ],
  providers: [ActivityResolver, ActivityService],
})
export class BaseModule {}
