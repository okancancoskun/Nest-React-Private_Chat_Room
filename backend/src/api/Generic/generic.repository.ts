import {
  Aggregate,
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export interface IGenericRepository<M, D, U> {
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

export class GenericRepository<M extends Document, D, U>
  implements IGenericRepository<M, D, U> {
  constructor(private readonly mongoModel: Model<M>) {}

  async create(dto: D): Promise<M> {
    const newModel = new this.mongoModel(dto);
    return await newModel.save();
  }

  async findAll(filter: FilterQuery<M>, options: QueryOptions): Promise<M[]> {
    return await this.mongoModel.find(filter, {}, options);
  }

  async findOne(filter: FilterQuery<M>, options: QueryOptions): Promise<M> {
    return await this.mongoModel.findOne(filter, {}, options);
  }

  async updateOne(
    filter: FilterQuery<M>,
    update: UpdateQuery<M>,
    options: QueryOptions,
  ): Promise<any> {
    return await this.mongoModel.updateOne(filter, update, options);
  }

  async findByIdAndUpdate(id: string, dto: U): Promise<M> {
    return await this.mongoModel.findByIdAndUpdate(id, dto);
  }

  async deleteOne(id: string): Promise<M> {
    return await this.mongoModel.findByIdAndDelete(id);
  }

  async aggregate(pipeline?: any[]): Promise<Aggregate<any[]> | any[]> {
    return await this.mongoModel.aggregate(pipeline);
  }
}
