import { gunzipSync } from 'zlib';
import * as pLimit from 'p-limit';
import { createInterface } from 'readline';
import { Injectable } from '@nestjs/common';
import { createReadStream, unlinkSync, writeFileSync } from 'fs';

import { ProductsService } from '../products/products.service';
import { ImporterRepository } from './repository/importer.repository';
import { Product, ProductStatus } from '../products/entities/product.entity';

interface Contents {
  fileName: string;
  buffer: ArrayBuffer;
}

@Injectable()
export class ImporterService {
  private readonly FileNameUrl: string;
  private readonly FileContentUrl: string;

  constructor(
    private readonly productService: ProductsService,
    private readonly importerRepository: ImporterRepository,
  ) {
    this.FileNameUrl = process.env.FILE_NAMES_URL;
    this.FileContentUrl = process.env.FILE_CONTENT_URL;
  }

  async main() {
    const files = await this.getFiles();

    const fileContets = await this.getFileContent(files);
    const filePaths = await this.saveFileContent(fileContets);

    const limit = pLimit(3);

    const promises = filePaths.map((filePath) => {
      return limit(() => {
        return this.saveProducts(filePath);
      });
    });

    await Promise.all(promises);

    return;
  }

  async getFiles(): Promise<string[]> {
    const response = await fetch(this.FileNameUrl);

    const fileNames = (await response.text())
      .split(/\n/)
      .filter((fileName) => fileName);

    return fileNames;
  }

  async getFileContent(fileNames: string[]): Promise<Contents[]> {
    const limit = pLimit(3);

    const promises = fileNames.map((fileName: string) => {
      return limit(async () => {
        const name = fileName.substring(0, 11);
        const imported = await this.importerRepository.findOneByName(name);

        if (!imported) {
          const response = await fetch(`${this.FileContentUrl}/${fileName}`);
          const buffer = await response.arrayBuffer();
          return { fileName, buffer };
        }
      });
    });

    const results = await Promise.all(promises);

    return results.filter((result) => result);
  }

  async saveFileContent(contents: Contents[]): Promise<string[]> {
    const filePaths: string[] = [];
    const limit = pLimit(3);

    const promises = contents.map((content: Contents) => {
      return limit(async () => {
        const { fileName, buffer } = content;

        const filePath = `tmp/${fileName}.json`;

        // save the .json filed
        const unzipedFile = await gunzipSync(buffer);
        await writeFileSync(filePath, unzipedFile);

        filePaths.push(filePath);
      });
    });

    await Promise.all(promises);

    return filePaths;
  }

  async saveProducts(filePath: string): Promise<void> {
    const limit = pLimit(3);
    const objects: Product[] = [];

    const fileStream = createReadStream(filePath);

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity, // Para tratar finais de linha
    });

    for await (const line of rl) {
      if (objects.length < 100) {
        try {
          const parsedLine = JSON.parse(line);
          let { code } = parsedLine;

          code = parsedLine.code.includes('"')
            ? parsedLine.code.split('"')[1]
            : parsedLine.code;

          objects.push({
            ...parsedLine,
            code: parseInt(code),
            status: ProductStatus.DRAFT,
          });
        } catch (err) {
          
          console.error('Erro ao parsear a linha:', err);
          return;
        }
      }
    }

    await unlinkSync(filePath);
    await this.productService.insertMany(objects);
    await this.create(filePath);

    return;
  }

  async create(filePath: string) {
    const fileName = filePath.substring(4, 15);

    return this.importerRepository.create({ name: fileName });
  }
}
