const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var utils = require("./index");

function mock1MonthBefore() {
  return new Date(2019, 5, 25);
}
function mockToday() {
  return new Date(2019, 6, 25, 0, 0, 0);
}
function mockTomorrow() {
  return new Date(2019, 6, 26);
}
function mockNow() {
  return new Date(2019, 6, 25, 12, 30);
}

describe("utils::DateTime", function () {
  before(() => {
    chai.spy.on(utils.datetime, 'now', function () {
      return new utils.datetime.DateTime(mockNow());
    });
    chai.spy.on(utils.datetime, 'today', function () {
      return new utils.datetime.DateTime(mockToday());
    });
  });
  after(function () {
    chai.spy.restore(utils.datetime, 'today');
    chai.spy.restore(utils.datetime, 'now');
  });

  describe("#now()", function () {
    it('should create date object', () => {
      expect(utils.datetime.now()).be.an('object');
    });
    it('should have today date', () => {
      expect(utils.datetime.now()._date._d.toString()).be.equals(mockNow().toString());
    });
  });
  it('#new() should return dateobject with current datetime', () => {
    var date = new utils.datetime.new();
    expect(date.toISO()).not.to.be.undefined;
  });
  describe("#today()", function () {
    it('should create date object', () => {
      expect(utils.datetime.today()).be.an('object');
    });
    it('should have today date', () => {
      expect(utils.datetime.today()._date._d.toString()).be.equals(mockToday().toString());
    });
  });
  describe("#DateTime", function () {
    it('should be able to create new object', () => {
      expect(new utils.datetime.DateTime(mockNow())).be.an('object');
    });
    it('#date() should return date object', () => {
      var date = new utils.datetime.DateTime(mockNow());
      expect(date.date()).be.equals(date._date._d);
    });
    it('#today() should reset the time to start', () => {
      var date = new utils.datetime.DateTime(mockNow());
      date.today();
      expect(date.date().toString()).be.equals(mockToday().toString());
    });
    it('#diffInDays() should return difference in days', () => {
      var date = new utils.datetime.DateTime(mockToday());
      var date2 = new utils.datetime.DateTime(mockTomorrow());
      expect(date2.diffInDays(date)).be.equals(1);
    });
    it('#diffInDays() should return -ve difference in days', () => {
      var date = new utils.datetime.DateTime(mockToday());
      var date2 = new utils.datetime.DateTime(mockTomorrow());
      expect(date.diffInDays(date2)).be.equals(-1);
    });
    it('#diffInHours() should return difference in hours', () => {
      var date = new utils.datetime.DateTime(mockToday());
      var date2 = new utils.datetime.DateTime(mockNow());
      expect(date2.diffInHours(date)).be.equals(12);
    });
    it('#diffInHours() should return -ve difference in days', () => {
      var date = new utils.datetime.DateTime(mockToday());
      var date2 = new utils.datetime.DateTime(mockTomorrow());
      expect(date.diffInHours(date2)).be.equals(-24);
    });
    it('#addDays() should add given days', () => {
      var date = new utils.datetime.DateTime(mockToday());
      date.addDays(1);
      var date2 = new utils.datetime.DateTime(mockTomorrow());
      expect(date.diffInHours(date2)).be.equals(0);
    });
    it('#endOfDay() should set time 23:59:59', () => {
      var date = new utils.datetime.DateTime(mockToday());
      expect(date.endOfDay().toString('time24')).be.equals('23:59:59');
    });
    it('#toString() should return default format', () => {
      var date = new utils.datetime.DateTime(mockToday());
      expect(date.toString()).be.equals(mockToday().toISOString());
    });
    it('#toString("short") should return with given format', () => {
      var date = new utils.datetime.DateTime(mockToday());
      expect(date.toString('short')).be.equals('25th Jul, 2019');
    });
    it('#getMiliseconds() should return date in ms format', () => {
      var date = new utils.datetime.DateTime(mockToday());
      expect(date.getMiliseconds()).be.equals(mockToday().getTime());
    });
    it('#startOf("day") should set time 12:00am', () => {
      var date = new utils.datetime.DateTime().startOf('day');
      expect(date.toString('hh:mm')).be.equals('12:00');
    });
    it('#startOfDay() should set time 12:00am', () => {
      var date = new utils.datetime.DateTime().startOfDay();
      expect(date.toString('hh:mm')).be.equals('12:00');
    });
    it('#year() should return 2019', () => {
      var date = new utils.datetime.DateTime(mockToday());
      expect(date.year()).be.equals('2019');
    });
    it('#month() should return 7', () => {
      var date = new utils.datetime.DateTime(mockToday());
      expect(date.month()).be.equals('7');
    });
    it('#toISO() should return iso formatted string', () => {
      var date = new utils.datetime.DateTime(mockToday());
      expect(date.toISO()).be.equals(mockToday().toISOString());
    });
    it('should be able to pass datetime object', () => {
      var stDate = new utils.datetime.DateTime(mockToday());
      var date = new utils.datetime.DateTime(stDate);
      date.addDays(-1)
      expect(date.toString('short')).be.equals('24th Jul, 2019');
      expect(stDate.toString('short')).be.equals('25th Jul, 2019');
    });

    it('#endOf("day") should set time 11:59pm', () => {
      var date = new utils.datetime.DateTime().endOf('day');
      expect(date.toString('hh:mm')).be.equals('11:59');
    });



    it('#addMonths(1) should add 1 month to date', () => {
      var date = new utils.datetime.DateTime(mockToday()).addMonths(1);
      expect(date.toString('MMM')).be.equals('Aug');
    });
    it('#addMonths(-1) should add -1 month to date', () => {
      var date = new utils.datetime.DateTime(mockToday()).addMonths(-1);
      expect(date.toString('MMM')).be.equals('Jun');
    });

    it('#diffInMonths(otherDate) should return 1 month', () => {
      var date = new utils.datetime.DateTime(mockToday());
      var date2 = new utils.datetime.DateTime(mock1MonthBefore());

      expect(date.diffInMonths(date2)).be.equals(1);
    });
    it('#diffInSeconds(otherDate) should return 10 secs', () => {
      var date = new utils.datetime.DateTime(new Date("Wed Jul 08 2020 14:11:41 GMT+0530 (India Standard Time)"));
      var date2 = new utils.datetime.DateTime(new Date("Wed Jul 08 2020 14:11:31 GMT+0530 (India Standard Time)"));

      expect(date.diffInSeconds(date2)).be.equals(10);
    });
    it('#diffInSeconds(otherDate) should return -10 secs', () => {
      var date = new utils.datetime.DateTime(new Date("Wed Jul 08 2020 14:11:31 GMT+0530 (India Standard Time)"));
      var date2 = new utils.datetime.DateTime(new Date("Wed Jul 08 2020 14:11:41 GMT+0530 (India Standard Time)"));

      expect(date.diffInSeconds(date2)).be.equals(-10);
    });

    it('#diffInSeconds(otherDate) should return -10 secs', () => {
      var date = new utils.datetime.DateTime(new Date("Wed Jul 08 2020 14:11:31 GMT+0530 (India Standard Time)"));
      var date2 = new utils.datetime.DateTime(new Date("Wed Jul 08 2020 14:11:41 GMT+0530 (India Standard Time)"));

      expect(date.diffInSeconds(date2)).be.equals(-10);
    });




  });


});