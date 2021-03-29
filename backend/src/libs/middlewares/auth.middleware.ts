import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Req,
  Res,
  Next,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import environment from 'src/tools/environment';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: Function) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, environment.token);
      req.user = user;
    } else {
      throw new HttpException('Error', HttpStatus.FORBIDDEN);
    }
    next();
  }
}
