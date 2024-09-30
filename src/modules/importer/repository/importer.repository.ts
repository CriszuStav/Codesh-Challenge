import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Importer, ImporterDocument } from '../entities/importer.entity';

@Injectable()
export class ImporterRepository {
  constructor(
    @InjectModel(Importer.name)
    private readonly importerModel: Model<ImporterDocument>,
  ) {}

  async create(importer: Importer): Promise<Importer> {
    return this.importerModel.create(importer);
  }

  async findOneByName(name: string): Promise<Importer> {
    return this.importerModel.findOne({ name });
  }
}
