import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonService {
  findOne(id: number) {
    return `This action returns a #${id} person`;
  }
}
