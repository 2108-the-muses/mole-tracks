# Mole Tracks

![Mole](/assets/images/face-with-mole.png)


## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Next Steps](#next-steps)
- [Creators](#creators)


# Introduction

Mole Tracks is a mobile application that helps people monitor the moles on their skin. According to the American Cancer Society, melanoma (skin cancer) is the most common type of cancer. In an effort to decrease severe melanoma cases, this visually pleasing app makes it easier for people to track any suspicious moles and catch cancerous moles before they become problematic.

Users can take pictures of their moles and track any visual changes over time, and can test their moles for malignancy using our experimental machine learning model. They also have the option to add names, tags, notes, and coordinates to more easily track their moles.

**DISCLAIMER: THIS APP DOES NOT PROVIDE MEDICAL ADVICE**
*The information, including but not limited to, text, graphics, images and other material contained on this application are for informational purposes only. No material on this application is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this application.*

Watch our demo video (insert demo video here eventually)

## Tech Stack
* React Native
* Firebase (Authentication)
* Cloudinary
* PostgreSQL
* Sequelize
* Express
* Expo
* Node.js
* Heroku
* TensorFlow.js
* Teachable Machine
* Google Login


# Features
## App Features
 - **Account**
    - User can sign-up for an account, login, and logout
    - User can view and edit their account profile
    - User can change their password
    - Persistant login using **Firebase** Authentication
    - User can choose to sign in with their **Google** account
- **Moles**
    - Displays all moles as a list under body part categories
    - User can click on individual moles to view
    - User can view, add, edit, and delete moles
    - Displays moles as coordinates on a body image that users can click on
- **Entries**
    - User can compare entries with each other to see any changes
    - User can select tags for their entries
    - User can view, add, edit, and delete entries
    - User can check if their moles are malignant using machine learning (**Tensorflow** & **Teachable Machine**)
- **Image Capture & Storage**:
    - Images can be taken of moles on the user's phone using **Expo** camera
    - Images are stored using **Cloudinary**
- **Info**
    - User can view recommended skin monitoring guidelines


## Technical Features
- Registration with E-mail & Password
- Uploading and retrieving images from Cloudinary Database
- React Navigation with nested stack & bottom tab navigators
- Machine Learning model using Teachable Machine and TensorFlow.js



# Getting Started

Fork and clone this repo. Then, `npm install`.

Create a secrets file:
`touch secret.js`

Add the following Firebase, local IP Address, and Cloudinary information:

```
const API_KEY = "insert-your-key";
const AUTH_DOMAIN = "insert-your-auth-domain.firebaseapp.com";
const PROJECT_ID = "insert-your-project-id";
const STORAGE_BUCKET = "insert-your-project-id.appspot.com";
const MESSAGING_SENDER_ID = "insert-your-sender-id";
const APP_ID = "insert-your-app-id";
const MEASUREMENT_ID = "insert-your-measurement-id";
const IP_ADDRESS = "insert-your-local-ip-address";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/insert-your-cloudinary-cloud-name/image/upload";
const upload_preset = "insert-upload-preset-name";

module.exports = {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  IP_ADDRESS,
  CLOUDINARY_URL,
  upload_preset,
};
```

Create a Firebase admin file:
`touch firebase-admin-sdk.json`

Add the following:

```
{"type": "service_account",
    "project_id": "insert-yours-here",
    "private_key_id": "insert-yours-here",
    "private_key": "insert-yours-here",
    "client_email": "insert-yours-here",
    "client_id": "insert-yours-here",
    "auth_uri": "insert-yours-here",
    "token_uri": "insert-yours-here",
    "auth_provider_x509_cert_url": "insert-yours-here",
    "client_x509_cert_url": "insert-yours-here"}

```

Create a .env file:
`touch .env`


Add the following:

```
API_KEY = insert-your-key
AUTH_DOMAIN = insert-your-auth-domain.firebaseapp.com
PROJECT_ID = insert-your-project-id
STORAGE_BUCKET = insert-your-project-id.appspot.com
MESSAGING_SENDER_ID = insert-your-sender-id
APP_ID = insert-your-app-id
MEASUREMENT_ID = insert-your-measurement-id
IP_ADDRESS = insert-your-local-ip-address
GOOGLE_APPLICATION_CREDENTIALS = "path-to-firebase-admin-sdk.json"
```

`npm run server`
`npm run start`


## How to Seed PostgreSQL with our seed data setup:
Create an empty database using PostgreSQL:
`createdb mole-tracks`

Run the seed file to populate the database:
`npm run seed`


# Next Steps
The next steps for Mole Tracks is to enable the user to easily send their mole information to a physician, provide the user with growth data by calculating the area of their moles and keeping track of any changes in that area over time, and make our mole analysis machine learning model more inclusive. Unfortunately, the machine learning model that we used is based primarily on images of moles on lighter skin tones. A feature that would greatly improve the inclusivity of our mole analyis feature is allowing the user to trace their mole on the image to help make it clear what should be recognized as a mole.


# Creators
* Gillian (Gigi) Markley: [GitHub](https://github.com/gigimarkley) | [LinkedIn](https://www.linkedin.com/in/gillian-markley/)
* Vera Kahn: [GitHub](https://github.com/charmingduchess) | [LinkedIn](https://www.linkedin.com/vera-kahn)
* Sonja Pylvainen: [GitHub](https://github.com/maijaleena) | [LinkedIn](https://www.linkedin.com/in/sonjapyl/)
* Alexandra Marks: [GitHub](https://github.com/amarks93) | [LinkedIn](https://www.linkedin.com/in/alexandravmarks)





