/**
 * reference https://cloud.google.com/nodejs/docs/reference/storage/2.5.x/File#download
 */

const getFileSourceCode = async (storage, websiteId, file) => {
  return new Promise((resolve, reject) => {
    storage
    .bucket(process.env.GOOGLE_STORAGE_BUCKET)
    .file(`${websiteId}/${file.type}s/${file.filename}`)
    .download()
    .then(function(data) {
      const contents = data[0].toString('utf8');
      resolve(contents);
    })
    .catch(error => {
      reject(error);
    });
  });
};

module.exports = getFileSourceCode;