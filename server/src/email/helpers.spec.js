const { expect } = require('chai');
const helpers = require('./helpers');

describe('Email:Helpers', () => {
  describe('processBody()', () => {
    it('should inject keys given in data with ##data.key##', () => {
      const output = helpers.processBody('Hello there I am ##data.name##', { name: 'Rahul' });
      expect(output).to.equal('Hello there I am Rahul');
    });

    it('should inject nested keys given in data with ##data.key##', () => {
      const output = helpers.processBody('Hello there I am ##data.name##', { name: 'Rocket of ##data.key##', key: 'Locket' });
      expect(output).to.equal('Hello there I am Rocket of Locket');
    });

    it('should inject nested keys as functions given in data with ##data.key##', () => {
      const output = helpers.processBody('Hello there I am ##data.name##', { name: (data) => { if (data.key === 'Locket') { return 'Rocket of ##data.key##'; } }, key: 'Locket' });
      expect(output).to.equal('Hello there I am Rocket of Locket');
    });
    it('should handle null or blank value', () => {
      const output = helpers.processBody('Hello there I am ##data.name##', { name: (data) => { if (data.key === 'Locket') { return 'Rocket of ##data.key##'; } }, key: 'Locket2' });
      expect(output).to.equal('Hello there I am ');
    });
    it('should handle 0 value', () => {
      const output = helpers.processBody('Hello there I am ##data.name##', { name: (data) => { if (data.key === 'Locket') { return 0; } }, key: 'Locket' });
      expect(output).to.equal('Hello there I am 0');
    });

  });
});