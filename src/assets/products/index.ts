// Product images organized by finish
import noirMatSparkling from './noir-mat-sparkling.png';
import noirMatBoiling from './noir-mat-boiling.png';
import noirMatFaucet from './noir-mat-faucet.png';

import chromeSparkling from './chrome-sparkling.png';
import chromeBoiling from './chrome-boiling.png';
import chromeFaucet from './chrome-faucet.png';

import brushedNickelSparkling from './brushed-nickel-sparkling.png';
import brushedNickelBoiling from './brushed-nickel-boiling.png';
import brushedNickelFaucet from './brushed-nickel-faucet.png';

import orBrosseSparkling from './or-brosse-sparkling.png';
import orBrosseBoiling from './or-brosse-boiling.png';
import orBrosseFaucet from './or-brosse-faucet.png';

import gunMetalSparkling from './gun-metal-sparkling.png';
import gunMetalBoiling from './gun-metal-boiling.png';
import gunMetalFaucet from './gun-metal-faucet.png';

export const productImages = {
  'black-matt': {
    sparkling: noirMatSparkling,
    boiling: noirMatBoiling,
    faucet: noirMatFaucet,
  },
  'chrome': {
    sparkling: chromeSparkling,
    boiling: chromeBoiling,
    faucet: chromeFaucet,
  },
  'brushed': {
    sparkling: brushedNickelSparkling,
    boiling: brushedNickelBoiling,
    faucet: brushedNickelFaucet,
  },
  'gold': {
    sparkling: orBrosseSparkling,
    boiling: orBrosseBoiling,
    faucet: orBrosseFaucet,
  },
  'gunmetal': {
    sparkling: gunMetalSparkling,
    boiling: gunMetalBoiling,
    faucet: gunMetalFaucet,
  },
};

// Default images (Chrome as default)
export const defaultImages = productImages['chrome'];
