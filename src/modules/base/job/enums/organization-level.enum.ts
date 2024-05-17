import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationLevelEnum {
  ASSOCIATE = 'معاونت',
  MANAGEMENT = 'مدیریت',
  PRESIDENCY = 'ریاست',
  RESPONSIBLE = 'مسئول',
  SUPERIOR = 'کارشناس ارشد',
  EXPERT = 'کارشناس',
  TECHNICIAN = 'کاردان',
  EMPLOYEE = 'کارمند',
  WORKER = 'کارگر',
}

registerEnumType(OrganizationLevelEnum, {
  name: 'OrganizationLevelEnum',
  description: 'Organization Level',
});
