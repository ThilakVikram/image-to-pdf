const fs = require('fs');

// const folderPath = './images';

// Function to get folder files in an array
function getFolderFilesArray(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// Usage
async function main(folderPath) {
  try {
    const folderFilesArray = await getFolderFilesArray(folderPath);
    return folderFilesArray;
    } catch (error) {
    console.error('Error reading folder files:', error);
  }
}

// main();

module.exports = main;