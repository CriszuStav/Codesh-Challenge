import { PartialType } from '@nestjs/mapped-types';
import { CreateImporterDto } from './create-importer.dto';

export class UpdateImporterDto extends PartialType(CreateImporterDto) {}
