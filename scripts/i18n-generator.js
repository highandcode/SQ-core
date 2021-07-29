var FS = require('fs');
var source = require('../../../src/i18n/langs/en.json');
const langsToGenerate = [{
  lang: 'es',
  name: 'Spanish',
  text: ''
}, {
  lang: 'es',
  text: '',
  name: 'Spanish'
}];

const template = (langName, dir) => {
  return {};
}
langsToGenerate.forEach((lang) => {
  translate(source, lang.lang, lang.text);
})

function translate(source, targetLang, text) {
  var objectReturn = template(targetLang);
  var queue = [];
  console.log(objectReturn);

  const allMessages = [];
  Object.keys(source).forEach((message) => {
    allMessages.push(message);
  });
  // queue.push(getMessage(allMessages.join('|'), targetLang).then((res) => {
  var arr = text.split('|');
  var count = 0;
  Object.keys(source).forEach((message) => {
    objectReturn[message] = arr[count];
    count++;
  });
  // }))
  console.log('@final');
  Promise.all(queue).then(() => {
    console.log(objectReturn);
    console.log(__dirname);
    FS.writeFile(`${__dirname}/../../../src/i18n/langs/${targetLang}.json`, `${JSON.stringify(objectReturn)}`, 'utf8', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('done:' + targetLang);
      }
    });
  });
}

function getFakeMessage(message, lang) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        translatedText: message
      }, 300);
    })
  })
}