import {
  Aggregate,
  Document,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { IGenericRepository } from './generic.repository';

export interface IGenericService<M, D, U> {
  create(dto: D): Promise<M>;
  findAll(filter: FilterQuery<M>, options: QueryOptions): Promise<M[]>;
  findOne(filter: FilterQuery<M>, options: QueryOptions): Promise<M>;
  updateOne(
    filter: FilterQuery<M>,
    update: UpdateQuery<M>,
    options: QueryOptions,
  ): Promise<any>;
  findByIdAndUpdate(id: string, dto: U): Promise<M>;
  deleteOne(id: string): Promise<M>;
  aggregate(pipeline?: any[]): Promise<Aggregate<any[]> | any[]>;
}

export class GenericService<M extends Document, D, U>
  implements IGenericService<M, D, U> {
  constructor(protected readonly repository: IGenericRepository<M, D, U>) {}

  public async create(dto: D): Promise<M> {
    return this.repository.create(dto);
  }

  public async findAll(
    filter: FilterQuery<M>,
    options: QueryOptions,
  ): Promise<M[]> {
    return this.repository.findAll(filter, options);
  }

  public async findOne(
    filter: FilterQuery<M>,
    options: QueryOptions,
  ): Promise<M> {
    return this.repository.findOne(filter, options);
  }

  public async updateOne(
    filter: FilterQuery<M>,
    update: UpdateQuery<M>,
    options: QueryOptions,
  ): Promise<any> {
    return this.repository.updateOne(filter, update, options);
  }

  public async findByIdAndUpdate(id: string, dto: U): Promise<M> {
    return this.repository.findByIdAndUpdate(id, dto);
  }

  public async deleteOne(id: string): Promise<M> {
    return this.repository.deleteOne(id);
  }

  public async aggregate(pipeline?: any[]): Promise<Aggregate<any[]> | any[]> {
    return this.repository.aggregate(pipeline);
  }
}
