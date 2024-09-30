import { DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const packageJsonPath = resolve(__dirname, '../../package.json');
const packageData = readFileSync(packageJsonPath, 'utf8');
const packageJson = JSON.parse(packageData);

const { name, version } = packageJson;

export const swaggerConfig = new DocumentBuilder()
  .setTitle(name)
  .setVersion(version)
  .setDescription('Parser de Produtos')
  .addServer(`http://localhost:${process.env.PORT}`)
  .build();
