import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FatherEntity } from './father.entity';
import { ChildModule } from 'src/child/child.module';
// import { FatherResolver } from './father.resolver';
import { FatherService } from './father.service';
import { ChildEntity } from 'src/child/child.entity';

@Module({
  imports: [
    ChildModule,
    TypeOrmModule.forFeature([FatherEntity, ChildEntity]),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
  ],
  providers: [
    //FatherResolver,
    FatherService,
  ],
})
export class FatherModule {}
