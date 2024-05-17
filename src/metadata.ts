/* eslint-disable */
export default async () => {
  const t = {
    ['./modules/base/activities/enums/group-type.unum']: await import(
      './modules/base/activities/enums/group-type.unum'
    ),
  };
  return {
    '@nestjs/graphql': {
      models: [
        [
          import('./modules/base/companies/company.model'),
          {
            Company: {
              _id: {},
              name: {},
              mission: {},
              vision: {},
              children: {},
              createAt: {},
              updatedAt: {},
              deletedAt: {},
            },
          },
        ],
        [
          import('./modules/base/companies/dto/create-company.input'),
          {
            CreateCompanyInput: {
              name: {},
              mission: { nullable: true },
              vision: { nullable: true },
              children: { nullable: true },
            },
          },
        ],
        [
          import('./modules/base/companies/dto/update-company.input'),
          {
            UpdateCompanyInput: {
              name: { nullable: true },
              mission: { nullable: true },
              vision: {},
              children: { nullable: true },
            },
          },
        ],
        [
          import('./modules/common/dto/pagination.input'),
          {
            PaginationArgs: {
              limit: { nullable: true },
              offset: { nullable: true },
            },
          },
        ],
        [
          import('./modules/base/staffs/staff.model'),
          {
            Staff: {
              _id: { nullable: true },
              username: {},
              firstname: { nullable: true },
              lastname: { nullable: true },
              password: { nullable: true },
              email: { nullable: true },
              nationalNumber: { nullable: true },
              personalID: { nullable: true },
              phone: { nullable: true },
              jobPosition: {},
              company: {},
              createAt: {},
              updatedAt: {},
              deletedAt: {},
            },
          },
        ],
        [
          import('./modules/base/job-positions/job-position.model'),
          {
            JobPosition: {
              title: {},
              owner: {},
              organizationLevel: {},
              company: {},
              createAt: {},
              updatedAt: {},
              deletedAt: {},
            },
          },
        ],
        [
          import('./modules/base/activities/activity.model'),
          {
            Activity: {
              _id: {},
              title: {},
              description: { nullable: true },
              type: {},
              jobPosition: { nullable: true },
              company: {},
              createAt: {},
              updatedAt: {},
              deletedAt: {},
            },
          },
        ],
        [
          import('./modules/base/departments/department.model'),
          {
            Department: {
              _id: { nullable: true },
              name: {},
              description: { nullable: true },
              children: {},
              supervisor: {},
              members: {},
              company: {},
              createAt: {},
              updatedAt: {},
              deletedAt: {},
            },
          },
        ],
        [
          import('./modules/base/departments/dto/create-department.input'),
          {
            CreateDepartmentInput: {
              name: {},
              description: { nullable: true },
              supervisor: {},
              parent: { nullable: true },
              children: { nullable: true },
              company: {},
            },
          },
        ],
        [
          import('./modules/base/departments/dto/update-department.input'),
          {
            UpdateDepartmentInput: {
              name: { nullable: true },
              description: { nullable: true },
              supervisor: { nullable: true },
            },
          },
        ],
        [
          import('./modules/base/staffs/dto/create-staff.input'),
          {
            CreateStaffInput: {
              username: {},
              firstname: { nullable: true },
              lastname: { nullable: true },
              password: { nullable: true },
              email: { nullable: true },
              phone: { nullable: true },
              nationalNumber: { nullable: true },
              staffId: { nullable: true },
              position: { nullable: true },
              company: {},
            },
          },
        ],
        [
          import('./modules/base/staffs/dto/update-staff.input'),
          {
            UpdateStaffInput: {
              firstname: { nullable: true },
              lastname: { nullable: true },
              password: { nullable: true },
              nationalNumber: { nullable: true },
              staffId: { nullable: true },
              position: { nullable: true },
            },
          },
        ],
        [
          import('./modules/base/activities/dto/create-activity.input'),
          {
            CreateActivityInput: {
              title: {},
              description: { nullable: true },
              type: {},
              position: {},
              company: {},
            },
          },
        ],
        [
          import('./modules/base/activities/dto/update-activity.input'),
          {
            UpdateActivityInput: {
              title: { nullable: true },
              description: { nullable: true },
              type: { nullable: true },
              position: { nullable: true },
            },
          },
        ],
        [
          import('./modules/base/job-positions/dto/create-job-position.input'),
          {
            CreateJobPositionInput: {
              title: {},
              department: {},
              supervisor: {},
              company: {},
            },
          },
        ],
        [
          import('./modules/base/job-positions/dto/update-job-position.input'),
          {
            UpdateJobPositionInput: {
              title: { nullable: true },
              department: { nullable: true },
              supervisor: { nullable: true },
            },
          },
        ],
        [
          import('./modules/base/job/job.model'),
          {
            JobPosition: {
              title: {},
              owner: {},
              organizationLevel: {},
              company: {},
              createAt: {},
              updatedAt: {},
              deletedAt: {},
            },
          },
        ],
        [
          import('./modules/base/job/dto/create-job.input'),
          {
            CreateJobPositionInput: {
              title: {},
              department: {},
              supervisor: {},
              company: {},
            },
          },
        ],
        [
          import('./modules/base/job/dto/update-job.input'),
          {
            UpdateJobPositionInput: {
              title: { nullable: true },
              department: { nullable: true },
              supervisor: { nullable: true },
            },
          },
        ],
      ],
    },
  };
};
