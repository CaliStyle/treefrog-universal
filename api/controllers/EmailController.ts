import { Request, Response } from 'express';
import { Controller } from 'trails-api';
/**
 * @module EmailController
 */

export class EmailController extends Controller {

  send(req: Request, res: Response){
    this.app.services.EmailService.send({
      to: this.app.config.email.toAddress,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html
    })
    .then(info =>{
      res.json(info.response)
    })
    .catch(err =>{
      this.log.error(err)
      res.json(err)
    })
  }
}
