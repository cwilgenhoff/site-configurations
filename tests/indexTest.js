import LH from '../src/index.js';
import FEATURES from '../src/constants/features';

let sinon = require('sinon');

describe('LH', () => {
  let sandbox;

  beforeEach(() => {
    if (!global.window) {
      global.window = { location: {} };
    }

    sandbox = sinon.sandbox.create({ useFakeServer: false });
    sandbox.stub(FEATURES, 'all', {
      configuration1: 'E',
      configuration2: 'Z',
    });
  });

  afterEach(() => {
    delete global.window.LH;
    sandbox.restore();
  });

  it('exists', () => {
    new LH();
    window.LH.should.exist;
  });

  describe('async', () => {
    beforeEach(() => {
      window.LH = ['configuration1', 'configuration2', 'configuration3'];
      new LH();
    });

    it('pushes configurations', () => {
      window.LH.enabledFeatures.should.be.eql(['configuration1', 'configuration2']);
    });

    it('tells when a feature is enabled', () => {
      window.LH.isEnabled('configuration1').should.be.true;
      window.LH.isEnabled('configuration2').should.be.true;
    });

    it('tells when a feature is disabled', () => {
      window.LH.isEnabled('configuration3').should.be.false;
    })

    it('generates correct enabled ids', () => {
      window.LH.getEnabledIds().should.be.equal('EZ');
    });
  });

  describe('sync', () => {
    beforeEach(() => {
      new LH();
    });

    it('pushes configurations', () => {
      window.LH.push('configuration1');
      window.LH.push('configuration2');
      window.LH.enabledFeatures.should.be.eql(['configuration1', 'configuration2']);
    });

    it('does not push a non-existent configuration', () => {
      window.LH.push('configuration3');
      window.LH.enabledFeatures.should.be.eql([]);
    });

    it('tells when a feature is enabled', () => {
      window.LH.push('configuration1');
      window.LH.isEnabled('configuration1').should.be.true;
    });

    it('tells when a feature is disabled', () => {
      window.LH.isEnabled('configuration1').should.be.false;
    })

    it('generates correct enabled ids', () => {
      window.LH.push('configuration1');
      window.LH.push('configuration2');
      window.LH.getEnabledIds().should.be.equal('EZ');
    });
  });
});
