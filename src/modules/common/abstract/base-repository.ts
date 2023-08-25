// import { NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// export abstract class BaseRepository<T> {
//   constructor(
//     @InjectModel(T.name)
//     private readonly model: Model<T>,
//   ) {}

//   findAll() {
//     // const { limit, offset } = paginationQueryDto;
//     return (
//       this.model
//         .find()
//         // .skip(offset)
//         // .limit(limit)
//         .exec()
//     );
//   }

//   async findOne(id: string): Promise<T> {
//     const result = await this.model.findOne({ _id: id }).exec();
//     if (!result) {
//       throw new NotFoundException(`${T.name} #${id} not found`);
//     }
//     return result;
//   }

//   async create(createCompanyInput) {
//     const company = new this.model(createCompanyInput);
//     return company.save();
//   }
// }
