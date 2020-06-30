import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(name: string, email: string): {} {
    console.log(name, email);
    return { name, email };
  }
}
