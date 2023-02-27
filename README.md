# WebSQL todolist
A simple react todolist application with sync to make it work in offline mode implemented using WebSQL **(deprecated)**.

**NOTE:** This application is created only for demo purpose. As WebSQL is deprecated and removed from Safari and some other browsers, this application maynot work. Recommended to use Chrome.

## How to Use in Offline mode
1. Browse the application with network connectivity once.
2. Go offline and proceed with using the application.
3. Turn on network connectivity and leave it for 1 minute to sync back the offline work

## View Demo [Click Here](https://websql-todolist.netlify.app)

### Libraries used in project
- redux with thunk middleware
- superagent

## How to run
### `npm install`
'npm install' in the project directory to download the dependencies

### `npm run start`
'npm run start' starts the development server on the port 5858 (change this port in package.json file if port already in use)