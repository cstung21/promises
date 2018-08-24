/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckLine = require('./promiseConstructor.js');
var gitHubAPI = require('./promisification.js');
Promise.promisifyAll(fs);
var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckLine.pluckFirstLineFromFileAsync(readFilePath) 
    .then(function (userName) {
      console.log(userName);
      return userName;
    })
    .then(function(user) {
      return gitHubAPI.getGitHubProfileAsync(user);
    })
    .then(function(profile) {
      console.log(profile);
      // var writeFile = Promise.promisify(fs.writeFile);
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profile), 'utf8');
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
