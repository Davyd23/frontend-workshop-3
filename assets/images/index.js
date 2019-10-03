/*
  exports all images from `govuk-frontend` lib for webpack consumption.

  All images exported here: https://github.com/alphagov/govuk-frontend/tree/master/src/assets/images

  exports as {
    ...
    [fileName]: `${fileName}.${fileExt}`,
    ...
  }
*/

const relativeImagesFolder = `../../node_modules/govuk-frontend/assets/images`
const imagesFolder = `${__dirname}/${relativeImagesFolder}`

require('fs').readdirSync(imagesFolder).forEach(fileName => {
  if (fileName.match(/\.(ico|png|jpg|gif)$/) !== null) {
    const name = fileName.replace('.ico', '').replace('.png', '').replace('.jpg', '').replace('.gif', '')
    exports[name] = `${relativeImagesFolder}/${fileName}`
  }
})