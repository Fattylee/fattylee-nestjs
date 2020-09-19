import {
  createConnection,
  getRepository,
  PrimaryGeneratedColumn,
  Entity,
  Column,
} from 'typeorm';

// const connection = await createConnection({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5433,
//   username: 'fattylee',
//   password: 'loocer@212',
//   database: 'sololearn',
//   entities: ['playground/*.entity.js'],
// });

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: string;
  @Column() name: string;
  @Column('varchar', { length: 255 }) email: string;
  @Column() age: number;
}
const userRepository = getRepository(User);

const user = new User();
user.name = 'fattylee abu';
user.age = 12;
user.email = 'fatty@example.com';
// await userRepository.save(user);
