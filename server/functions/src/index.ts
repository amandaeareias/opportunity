const admin = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

/* Initialize cloud functions */
try {
  admin.initializeApp();
  console.log('Functions running...')
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

module.exports.emailFunction = functions.firestore.document('/applications/{applicationId}')
  .onCreate((snapshot: any, context: any) => {
    const application: any = snapshot.data();
    return sendEmail(application);
  });
    
async function sendEmail(application: any) {
  const db = admin.firestore();
  const opportunityRef = await db.collection('opportunities').doc(application.opportunityId).get();
  if (opportunityRef.exists) {
    const opportunity: any = opportunityRef.data();

    const ngoRef = await db.collection('ngos').doc(opportunity.ngo.id).get();
    const ngo: any = ngoRef.data();
    const toEmail = ngo.username;

    const volunteerRef = await db.collection('volunteers').doc(application.volunteerId).get();
    const volunteer: any = volunteerRef.data();
    const { about, username, name, dateOfBirth } = volunteer;

    console.log('NGO', ngo);
    console.log('Volunteer', volunteer);

    const mailOpts = {
      from: `Team Opportunity <${functions.config().gmail.user}>`,
      to: toEmail,
      subject: `You have new application for ${opportunity.name}!`,
      html: `
        <h1>You have new application for ${opportunity.name}!</h1>
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