import { Request, Response } from 'express';
import { Controller } from 'trails-api';
import { ExpressEngineConfig } from 'angular2-express-engine';
import { MainModule } from '../../app/main.node';

/**
 * @module ViewController
 */

export class ViewController extends Controller {

  index(req: Request, res: Response ) {
    const originUrl = req.protocol && req.get('host') ? req.protocol + '://' + req.get('host') : 'http://localhost:3000';
    const baseRef: string =  req.baseUrl && req.baseUrl !== '' ? req.baseUrl : '/';

    const expressConfig : ExpressEngineConfig = {
      req,
      res,
      ngModule: MainModule,
      originUrl: originUrl,
      baseUrl: baseRef,
      requestUrl: req.url || baseRef,
      preboot: false
    };

    res.render('index', expressConfig);
  }
}
