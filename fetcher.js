const fs = require('fs');
const args = process.argv.slice(2);

const url = args[0];
const fileName = args[1];

console.log("url ", url);
console.log("filename ", fileName);

const request = require('request');

function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

request(url, function(error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  fs.writeFile(fileName, body, (err) => {
    if (err)
      console.log(err);
    else {
      const fileSize = getFilesizeInBytes(fileName);
      console.log(`Downloaded and saved ${fileSize} bytes to ${fileName}`);
    }
  });
});

