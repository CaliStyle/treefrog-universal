// config/email.js
module.exports = {
  //Custom transporter object to send email, by default created from smtp values but can be override here
  customTransporter: null,

    /*
     * SMTP Configuration
     * @see {@link http://nodemailer.com/2-0-0-beta/setup-smtp/}
     */
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: '', //enter your sending account details here
      pass: ''
    }
  },
    /*
     * Default data use with EmailService.send
     * from, to, css, bcc, subject, text, html, attachments
     */
  defaultData: {
    from: ''
  },
  toAddress: ''
}
