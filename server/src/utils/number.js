function getRandomS4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
function getRandomS6() {
  return [getRandomS4().substr(2), getRandomS4()].join('-');
}
function getRandomS8() {
  return [getRandomS4(), getRandomS4()].join('-');
}
module.exports = {
  getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  },
  getRandomBetweenRange(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  },
  getRandomMobile() {
    var i = 1;
    var num = [];
    while (i <= 10) {
      num.push(this.getRandomNumber(9));
      i++;
    }
    return num.join('');
  },
  getRandomS4,
  getRandomS6,
  getRandomS8
};
