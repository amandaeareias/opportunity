# Opportunity
Platform that connects people who want to volunteer with nonprofit organizations that need volunteers.  
[Live demo here](https://bit.ly/2uByUoy). 🤸‍

## Idea
In most cities, there are usually two or three famous NGOs that everyone knows. It happens a lot that, when someone wants to start volunteering, they usually go to one of those famous NGOs because they don’t know any other options, while hundreds of other organizations - that don’t have the same visibility, marketing, appealing website - still need help. **Opportunity** is an attempt to solve this problem, an online environment where small and local nonprofit organizations can get the visibility they need, and people willing to help can find local, small NGOs to work with and help making the world a better place.

## Technologies
- [Angular](https://angular.io/)
- [NGRX](https://ngrx.io/)
- [Firebase](https://firebase.google.com/)

## Showcase
![AppMockUp](https://drive.google.com/uc?export=view&id=1ihn_HsTaYyY7FOLP-xLZB3D4u2s9YCTQ)
*(Notice that the app was deployed only for showcase purposes, although it is working and ready to be used, all the data inside was randomly created and it is not real.)*

## Running development version
This project is open-source and everyone's welcome to contribute. Fork this repository, don't forget to create new branch by running `git checkout -b <YOUR_BRANCH_NAME>` as you won't be able to commit directly to `develop` branch. We're expecting pull requests to `develop`, all pull requests towards the `master` branch will be ignored.

To run project you need `@angular-cli` (https://www.npmjs.com/package/@angular/cli) and `firebase-tools` (https://www.npmjs.com/package/firebase-tools) installed on your machine.

Follow these steps to run development version on your machine:
### Git setup
Fork repository, clone it to your machine and create new branch: `git checkout -b <YOUR_BRANCH_NAME>`

### Environment setup
Go to `/opportunity/src/environments/environment.example.ts` and fill in your environment variables.
1. Setup your Firebase account [HERE](https://console.firebase.google.com/)
2. Learn how to get Google Maps API [HERE](https://developers.google.com/maps/documentation/javascript/get-api-key)
3. We use [IP Geolocation API](https://ipgeolocation.io/), check them out and get your API key. It's free!

Now, if you want to use or test email notification service, you'will need some more setup to be done, as this service uses Firebase Cloud Functions (More info here: https://firebase.google.com/docs/functions/).
Go to `/server/functions/src/index.ts` and configure your email transporter service.
For more info how to configure nodemailer: https://nodemailer.com/about/
Learn how to set Firebase configuration variables: https://firebase.google.com/docs/functions/config-env

### Run client side
Go to /opportunity and `npm install` to install all dependencies. After install is finished, run `ng serve` and open `http://localhost:4200` in the browser of your choice ;)

### Run Firebase Cloud Functions
Go to `/server/functions` and deploy functions by `firebase deploy --only functions`. Make sure `firebase-tools` (https://www.npmjs.com/package/firebase-tools) installed on your computer. More info [HERE](https://firebase.google.com/docs/functions/manage-functions).
