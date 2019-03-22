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

export const appendApplicationData = functions.firestore
    .document('/applications/{applicationId}')
    .onCreate(async (snapshot, context) => {
         // Grab the current value of what was written to the Realtime Database.
         let application = await snapshot.data();
         console.log('Appending', application);
        const pr = await snapshot.ref.parent.get();
        console.log(pr.)

        
         
        //  const refVolunteer = functions.database('/volunteers/application.volunteerId').;
        //  const refVolunteer = functions.database.document('/volunteers/application.volunteerId').;
        //  const refOpportunity = functions.database.ref('/opportunities/application.opportunityId');

        //  const volunteerFullData = await refVolunteer.data();
        //  const opportunityFullData = await refOpportunity.data();
 

        //  const volunteerData = {
        //      name: volunteerFullData.name,
        //      image: volunteerFullData.image
        //  };
        //  const opportunityData = {
        //      ngoName: opportunityFullData.ngo.name,
        //      name: opportunityFullData.name,
        //      about: opportunityFullData.about,
        //      location: opportunityFullData.location,
        //      prerequisites: opportunityFullData.prerequisites,
        //      active: opportunityFullData.active,
        //  };

        //  This function returns a Promise.
         return snapshot.ref.update({volunteerData: null, opportunityData: null});
    });

// export const appendApplicationData = functions.database.ref('/applications/{doc}')
//     .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        // const application = snapshot.val();
        // console.log('Appending', application);
        // const volunteerData = await admin.database().ref('/volunteers/{original.volunteerId}').val();
        // const opportunityData = await admin.database().ref('/opportunities/{original.opportunityId}').val();

        // application.volunteerData = {
        //     name: volunteerData.name,
        //     image: volunteerData.image
        // };
        // application.applicationData = {
        //     ngoName: opportunityData.ngo.name,
        //     name: opportunityData.name,
        //     about: opportunityData.about,
        //     location: opportunityData.location,
        //     prerequisites: opportunityData.prerequisites,
        //     active: opportunityData.active,
        // };
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // This function returns a Promise.
    //     return snapshot.ref.update(application);
    // });


