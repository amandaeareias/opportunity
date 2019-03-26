import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';
import { Application } from './model/application';

/* Initialize cloud functions */
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  console.log('db failure', e);
}
    
/* Firebase environment variables used */
/* More: https://firebase.google.com/docs/functions/config-env */
const gmailUser = functions.config().gmail.user;
const gmailPass = functions.config().gmail.password;

/* Please note that it's not the best choice to use gmail for that! */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPass,
  }
});

export default functions.database.ref('/applications/{applicationId}')
  .onCreate((event: any) => {
    const application: Application = event.data.val();
    return sendEmail(application);
  });
    
async function sendEmail(application: any) {
  const db = admin.firestore();
  const opportunity = await db.collection('opportunities').doc(application.opportunityId).get();
  if (opportunity.exists) {
    const ngo = await db.collection('ngos').doc(opportunity.data().ngo.id).get();
    const toEmail = ngo.exists ? ngo.data().username : functions.config().gmail.user;
    const volunteer = await db.collection('volunteers').doc(application.volunteerId).get();
    const { about, username, name, dateOfBirth } = volunteer.data();
    const mailOpts = {
      from: `Team Opportunity <${functions.config().gmail.user}>`,
      to: toEmail,
      subject: `You have new application for ${opportunity.data().name}!`,
      html: `
        <h1>You have new application for ${opportunity.data().name}!</h1>
        <p>Data:</p>
        <ul>
          <li>Volunteer name: ${name}</li>
          <li>Volunteer email: ${username}</li>
          <li>Why my opportunity: ${application.text}</li>
          <li>About volunteer: ${about}</li>
          <li>Date of birth: ${dateOfBirth}</li>
        </ul>
      `,      
    };
    let result;

    try {
      result = await transporter.sendMail(mailOpts);
    } catch (err) {
      result = err;
    }

    return result;
  }
  return false;
}