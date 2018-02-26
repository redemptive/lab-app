## Title

# Sparta Lab App

## Description

This is the app for displaying the data collected by the Jenkins automatic lab marking system

## Technologies

- Node.js
  - Request
  - Fs
  - Ejs
  - Express
  - Http
  - Body-parser
  - Mongoose
  - Socket.io

- HTML
- CSS
- JavaScript

## Installation and Usage

### To Run Locally

Clone this repository and ensure mongodb is installed on your computer. After the repository is installed, run `npm install` to install all of the Node.js dependancies listed above for the app to run. Then run `export DB_HOST=mongodb://[database ip]` replacing [database ip] with the ip address of your database (most likely localhost if you are running mongodb locally. The app uses this variable to find and connect to the database. Then run `node index` to actually start the app. If any errors occur or the app cannot connect to the database then you will be informed in the console.

### To Run On AWS

Clone this repository. You must have packer installed to generate a machine image for deploying to the cloud. Run `packer build packer.json` to create a machine image on aws for launching this app. Then go to the lab-terraform repository, clone it and edit the main.tf file to use the ami name packer generated for your app. Provision a database ami using the lab-db repository and add this to the file also. After all this, run `terraform apply` to get the system up and running on aws.