import { Module, forwardRef } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildEntity } from './child.entity';
// import { ChildResolver } from './child.resolver';
import { ChildService } from './child.service';
import { FatherEntity } from 'src/father/father.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChildEntity, FatherEntity]),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
  ],
  providers: [
    //ChildResolver
    ChildService,
  ],
})
export class ChildModule {}
