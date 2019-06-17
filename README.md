# SAM Research Database

## Introduction

Use this repo for developing and maintaining the web app at cse.buffalo.edu/eehuruguayresearch/.

## What's in the repo?

1. app - this folder contains the React app that powers the web app itself. You should review the Readme in this folder, and familiarize yourself with app development using React. You will mostly be concerned with maintaining the components code found in App/src/components, and the scripts in App/scripts.
2. db - a backup of the MySQL schema for the database on the back end. Right now, the database--which is hosted on CSE's tethys server, called eehuruguayresearch_db; someone will have to give you access--is populated with dummy data. To put the site into production, just delete the existing data, or wipe the entire database and import this schema.
3. login - these are the resources for the login page. Please note that the login page is not currently implemented, and user accounts and validation have yet to be implemented. Right now, to bypass the login page and visit the app online, go to cse.buffalo.edu/eehuruguayresearch/app. 
4. dependencies.txt - this is a list of items in the node_modules folder--which isn't included in the git repo--that must be included in the app folder in order to build the app for the web. See the React documentation for how this works-- most of these are automatically included when you create a new React app (and you can just use 'create-react-app' to create a new React app, then copy the node_modules folder to your local app/ directory), but there is at least one--react-datepicker--which must be included.

## Getting started

To begin maintaining this app, take these initial steps:

1. Install the necessary dependencies for creating React apps: https://reactjs.org/docs/create-a-new-react-app.html
2. Use the 'create-react-app' command to download the "node_modules" folder with dependencies for react apps (see link above).
3. Clone this repo onto your desktop.
4. Copy the "node_modules" folder into the app/ folder from the repo you just cloned.
5. Check the "node_modules" folder to see if anything from "dependencies.txt" is missing. As of writing this (2019-06-17) react-datepicker *should be* the only third-party dependency that needs to be downloaded, but that might change. In any event, download any missing dependencies.
6. In app/scripts, open "connect.php" and add an approved username in under the connection parameters. Then, go into "secrets.php" and enter the password as the return variable (secrets.php is excluded from the GitHub repo in .gitignore). Note: as the user accounts and login validation is developed, these files should probably change to include the appropriate connection information for the individuals using the site, instead of a static account.
7. To test the app on a local server, run the "npm start" command from the app/ director. To build the app publication on the web, run the "npm run build" command (a new folder will appear in app/ called build/--upload its contents to the CSE web server).

## Suggestions for future development

As of writing this (2019-06-17), this project went from conception to its current state in a single semester. There is still a lot that can, and should, be done! The following are all from my notes of ongoing things to work on:

* Fix bugs! There are a half-dozen or so bugs that I entered as issues in this GitHub repo. These should be addressed!
* Spanish language localization - many of the researchers who will be using this site speak Spanish, so there should be a way for the site to determine where the user is logged in from and switch the site's language accordingly.
* Add sort functionality to the CustomTable components
* Add a 'remove filter' button to the Filter components
* Add a 'reset filters' button to components where filters are used (AddShipments and ViewSamples)
* Change the GET requests to the database throughout to POST requests for greater security
* Add 'undo' functionality to user actions throughout (particularly those that alter the database)

## ...good luck!

It's a great project, and there's a lot of improvement to be made. Get to it! :)
