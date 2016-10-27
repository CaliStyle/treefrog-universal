import { Request, Response } from 'express';
import { Controller } from 'trails-api';
import { MainModule } from '../../app/main.node';

/**
 * @module ViewController
 */

export class ViewController extends Controller {

  index(req: Request, res: Response ) {
    const originUrl = req.protocol && req.get('host') ? req.protocol + '://' + req.get('host') : 'http://localhost:3000';
    const baseRef: any = '/';

    res.render('index', {
      req,
      res,
      ngModule: MainModule,
      originUrl: originUrl,
      baseUrl: req.baseUrl || baseRef,
      requestUrl: req.url || baseRef,
      async: true,
      precache: true,
      preboot: {
        appRoot: ['app'],
        buffer: true
      }
    });
  }
}
