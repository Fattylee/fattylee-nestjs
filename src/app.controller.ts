import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Header,
  Redirect,
  Res,
  Body,
} from '@nestjs/common';
import { AppService, ProductService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producService: ProductService,
  ) {}

  @Get()
  @HttpCode(230)
  getHello(): string {
    return this.producService.getProducts();
    // return this.appService.getHello();
  }

  @Get('fat')
  // @Redirect('http://localhost:3000/xyz')
  getFat(): string {
    return 'hi there';
  }

  @Get('abu')
  sayHiToAbu(): string {
    return 'Hi, Abu Adnaan';
  }

  @Post()
  sendToAbu(@Req() request: Request, @Body() body): string {
    console.log('Body:', body);
    console.log('value gaga', request.body);
    return 'Thanks ok';
  }

  @Get('num/*')
  // @Header('cached-control', 'fattylee')
  // @HttpCode(205)
  // @Redirect('http://localhost:3000/baby/abu', 300)
  hiUmmu(@Req() req: Request, @Res() res: Response): number {
    console.log(req.headers.host, '<====>', req.params);
    console.log(req.headers.location, '<====>', req.params);
    res.status(303).redirect('/baby/bababa');
    // res.status(430).send({ happy: true });
    return 345;
  }
}
