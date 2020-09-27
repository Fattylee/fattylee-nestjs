import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ParseIntPipe,
  HttpStatus,
  ParseUUIDPipe,
  ParseBoolPipe,
  ParseArrayPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';

import { CreateCatDTO } from './create-cat.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('cats')
// @UsePipes(new ValidationPipe())
export class CatsController {
  @Get()
  findAll(
    @Query(
      'q',
      new DefaultValuePipe(2345),
      // new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    searchQuery: string,
  ): string {
    console.log(typeof searchQuery);
    return `get all cats: query is: ${searchQuery}`;
  }

  @Post()
  // @UsePipes(new ValidationPipe())
  create(@Body() createCatDTO: CreateCatDTO): any {
    const { age, name, breed } = createCatDTO;
    // return {
    // message:
    return `create a new cat resource(${name}, ${age}, ${breed})`;
    // };
  }

  @Get()
  getIt(
    @Query(
      'query',
      // new ParseUUIDPipe({
      //   version: '5',
      //   errorHttpStatusCode: HttpStatus.FORBIDDEN,
      // }  ),
    )
    query: string,
  ): string {
    return `this is query: ${query}`;
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return `get a single cat with the id: ${id}`;
  }

  @Put(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDTO: Partial<CreateCatDTO>,
  ): string {
    return `Update resource at id: ${id}, and the following(${JSON.stringify(
      updateDTO,
    )})`;
  }

  @Delete(':id')
  deleteOne(
    @Query('search', new DefaultValuePipe(47)) searchMe: string,
    @Param('id', ParseIntPipe)
    id: string,
  ): string {
    return `delete a cat with the id: ${id}, searchQuery: ${searchMe}`;
  }
}
