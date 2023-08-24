import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingSerivce {
  abstract hash(data: string | Buffer): Promise<string>;
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
