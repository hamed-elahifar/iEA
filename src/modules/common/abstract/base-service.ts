import { BaseRespository } from './base-repository';

export abstract class BaseService {
  constructor(private readonly repository: BaseRespository<>) {
    super(repository);
  }

  async create() {
    return this.repository.create();
  }
  async findOne() {
    return this.repository.findOne();
  }
  async findAll() {
    return this.repository.findAll();
  }
  async update() {
    return this.repository.update();
  }
  async remove() {
    return this.repository.remove();
  }
}
