## Title

# Node lab app

## Description

A node.js app for communicating with a mongodb through mongoose which accepts data through /addresult to add to the database.

## Technologies

- Node.js
  - Request
  - Fs
  - HTTP
  - Ejs
  - Body-Parser
  - Mongoose
  - Express

- HTML
- JavaScript
- CSS

## Installation and Usage

### Run the App Locally
- Clone the repository.
- Change into the cloned folder and run npm install.
- Run the command export DB_HOST=mongodb://[dbip:port] where dbip is the ip of your database machine and port is the port on which mongodb is responding.
- Run node index to start the server.
- Navigate to localhost:3000 to see the app.

### Create Amazon AMI for Cloud Usage
- Run berks vendor cookbooks.
- Ensure you have environment variables for aws_access_key and aws_secret_key.
- Run packer build packer.json.
- Wait for AMI to be created.
- Launch the AMI and navigate to [appip]:80 as nginx is configured to run as a reverse proxy from port 80 to port 3000 for the app.