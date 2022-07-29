# Task Management 

Task management is usable web-app for managing teams remotely, enabling remote culture in teams.

## About
This project is bootstrapped using NextJs and Firebase as Backend service.

## Features
- Login/Signup authentication using firebase auth
- add tasks in any section i.e. add task in todo, in progress   or in completed tasks.
- drag and drop tasks across different sections i.e. todo    tasks, in progress tasks, completed tasks.
- implemented Remember Me functionality i.e maintain the user authentication state at session level or forever.

## Tech Stack

-  NextJS
-  Tailwind CSS
-  Redux toolkit
-  Firebase
    - Firebase Authentication
    - cloud firestore

## Installation Guide

### 1. Using NPM
> ***Note***: preffered to use Node version 18.2.0
`Asumming everyone knows how to setup firebase😅😄..`

- clone the repository to your host machine
- In cloned directory open terminal use command **`npm i`**
- Install tailwind if not installed (optional) **`npm install -D tailwindcss postcss autoprefixer`**
- create ***`.env.local`*** file
- setup firebase
- add firebase config to `.env.local` file. ex
    - NEXT_PUBLIC_FIREBASE_API_KEY="your api key"
    - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your auth domain key" likewise add all fields..
- enable **`firebase Authentication, cloud storage, firebase store`**  at **`console.firebase.com`**  
- finally, use **`npm run dev`**

#### Deployed Link:
[here](https://task-management-hazel.vercel.app/)


#### *Note:*
> Edit tasks is not implemented until now.... will work on this afterwards.

###### Any Contributions will be appreciated😋😋
