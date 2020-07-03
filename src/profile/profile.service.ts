import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  profiles() {
    return [{ name: 'fattylee' }];
  }
}
