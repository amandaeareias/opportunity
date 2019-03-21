// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin'); //all these functions have admin access!
admin.initializeApp();


// Listens for new applications added to "/applications" and 
// appends the volunteer and opportunity data to the object
// as well as updated applications count on volunteer and opportunity
exports.appendApplicationData = functions.database.ref('/applications')
    .onCreate(async (snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const application = await snapshot.val();
      console.log('Appending', application);
      const volunteerData = await admin.database().ref('/volunteers/{original.volunteerId}').val();
      const opportunityData = await admin.database().ref('/opportunities/{original.opportunityId}').val();

      application.volunteerData = {
        name: volunteerData.name,
        image: volunteerData.image
      };
      application.applicationData = {
        ngoName: opportunityData.ngo.name,
        name: opportunityData.name,
        about: opportunityData.about,
        location: opportunityData.location,
        prerequisites: opportunityData.prerequisites,
        active: opportunityData.active,
      };
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // This function returns a Promise.
      return snapshot.ref.update(application);
    });


