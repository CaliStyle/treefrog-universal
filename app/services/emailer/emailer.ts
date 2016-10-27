import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Abstract Class to Catch implementations
export class EmailerEnviroment {
  sendJobForm(data: any){
    throw new Error('Error sendJobForm EmailerNode')
  }
  sendContactForm(data: any){
    throw new Error('Error sendContactForm EmailerNode')
  }
  blogSignup(data: any){
    throw new Error('Error blogSignup EmailerNode')
  }
}
// Emailer -> EmailerEnviroment
@Injectable()
export class Emailer {
  constructor(private http: Http){}

  public sendJobForm(data: any){
    let subject = 'New Application';
    let text = '';
    let html = `
    <div>
      <h1>Name: ${data.name}</h1>
      <h2>Phone: ${data.phone}</h1>
      <h2>Email: ${data.email}</h1>
      <p>
      About You: ${data.aboutYou}
      </p>
    </div>
    `;
    return this.http.post('api/v1/email/send', {subject, text, html})
          .map(res => res.json());
  }
  public sendContactForm(data: any){
    let subject = 'New Customer!';
    let text = ''; //not used, might just rip this out
    let html = `
    <div>
      <h1>Name: ${data.name}</h1>
      <h2>Phone: ${data.phone}</h1>
      <h2>Email: ${data.email}</h1>
      <p>
      Project Description: ${data.projectDescription}
      </p>
      <p>
      Budget: ${data.budget}
      </p>
      <p>
      Comments: ${data.comments}
      </p>
    </div>
    `;
    return this.http.post('api/v1/email/send', {subject, text, html})
          .map(res => res.json());
  }
  public blogSignup(data: any){
    let subject = 'Send me the blogs yo';
    let text = '';
    let html = `
    <div>
      <p>This guy wants to sign up for the newsletter</p>
      <p>Email: ${data.email}</p>
    </div>
    `;
    return this.http.post('api/v1/email/send', {subject, text, html})
          .map(res => res.json());
  }
}
