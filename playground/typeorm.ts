import { Person } from './person.entity';
import { createConnection } from 'typeorm';
import { Product } from './product.entity';

const main = async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'fattylee',
    password: 'fattylee',
    database: 'sololearn',
    entities: ['playground/*.entity.ts'],
    synchronize: true,
    // dropSchema: true,
    // logging: true,
  });

  // const personRepo = connection.getRepository(Person);
  // const person = personRepo.create({ name: 'fat', age: 2 });
  // const person = await Person.create({ age: 67, name: 'tot' }).save();
  // await Person.delete([2, 3]);
  // console.log(await Person.find());
  // await Product.create({ name: 'product 2', person }).save();
  // console.log(await Product.find({ select: ['name', 'id', 'person'] }));
  const res = await Person.find({ relations: ['products'] });
  console.log(res);
  // console.log(JSON.stringify(res, null, 1));
};

main().catch(console.error);
