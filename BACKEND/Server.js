const fs = require('fs');
const https = require('https');
const app = require('./app'); // Require your 'app' module

const PORT = 3000;

const server = https.createServer(
  {
    key: fs.readFileSync('./Keys/privatekey.pem'),
    cert: fs.readFileSync('./Keys/certificate.pem'),
    passphrase: 'apds', // Add the passphrase if required
  },
  app
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
