const cordova = window.cordova;

function resolveFile(filePath) {
  if (cordova) {
    return cordova.file.applicationDirectory + 'www/' + filePath.substr(2);
  } else {
    return filePath;
  }
}
function resolveImageUrl(filePath) {
  if (cordova) {
    return window.API_SERVER + filePath;
  } else {
    return filePath;
  }
}

function getPathName() {
  if (cordova) {
    return window.location.hash && window.location.hash.substr(1);
  } else {
    return window.location.pathname;
  }
}

function isiOS() {
  return !!window.cordova && window.cordova.platformId === 'ios';
}

function isAndroid() {
  return !!window.cordova && window.cordova.platformId === 'android';
}

function isApp() {
  return !!window.cordova;
}

export { cordova, resolveFile, resolveImageUrl, getPathName, isAndroid, isiOS, isApp };
