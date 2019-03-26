    //1. Set-up
    const functions = require('firebase-functions')
    const nodemailer = require('nodemailer')
    const postmarkTransport = require('nodemailer-postmark-transport')
    const admin = require('firebase-admin')
    
    // 2. Admin SDK can only be initialized once
    try {admin.initializeApp(functions.config().firebase)} catch(e) {
            console.log('db failure')
    }
    
    // 3. Google Cloud environment variable used:
    // firebase functions:config:set postmark.key="API-KEY-HERE"        //!!!!!!!!!!!
    const postmarkKey = functions.config().postmark.key
    const mailTransport = nodemailer.createTransport(postmarkTransport({
            auth: {
                    apiKey: postmarkKey
            }
    }))
    
    // 4. Watch for new applications
    exports = module.exports = functions.database.ref('/applications/{applicationId}').onCreate((event: any) => {
            const snapshot = event.data
            const application = snapshot.val()
            // Use nodemailer to send email
            return sendEmail(application);
    })
    
    function sendEmail(application: any) {
            // 5. Geather relevant data
            const db = admin.firestore();
            db.collection('opportunities').doc(application.opportunityId).get().then((opportunityData:any) => {
                db.collection('ngos').doc(opportunityData.ngo.id).get().then((ngoData:any) => {
                    const ngoEmail = ngoData.username;
                    // 6. Send application email to ngo and volunteer
                    const mailOptions = {
                        from: '"Dave" <dave@example.net>',        //!!!!!!!!!!!
                        to: '${ngoEmail}',
                        subject: 'A new application!!!',
                        html: `<YOUR-WELCOME-MESSAGE-HERE>`
                    }
                    // 7. Process the sending of this email via nodemailer
                    return mailTransport.sendMail(mailOptions)
                            .then(() => console.log('Application confirmation email'))
                            .catch((error) => console.error('There was an error while sending the email:', error))
                            })
            })
    }