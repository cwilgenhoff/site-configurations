import FEATURES from './constants/features';

class LH {
  constructor() {
    this.enabledFeatures = [];
    this.importConfigurations();
    window.LH = this;
  }

  importConfigurations() {
    if (!window.LH || !Array.isArray(window.LH)) {
      return;
    }

    window.LH.forEach(featureName => this.push(featureName));
  }

  getEnabledIds() {
    return this.enabledFeatures.reduce((features, feature) => {
      if (FEATURES.all.hasOwnProperty(feature)) {
        return `${features}${FEATURES.all[feature]}`;
      }

      return `${features}`;
    }, '');
  }

  isEnabled(featureName) {
    return this.enabledFeatures.includes(featureName);
  }

  push(featureName) {
    if (!this.isEnabled(featureName) && FEATURES.all.hasOwnProperty(featureName)) {
      this.enabledFeatures.push(featureName);
    }
  }
}

export default LH;
