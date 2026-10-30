// Product images organized by finish
import noirMatSparkling from './noir-mat-sparkling.webp';
import noirMatBoiling from './noir-mat-boiling.webp';
import noirMatFaucet from './noir-mat-faucet.webp';

import chromeSparkling from './chrome-sparkling.webp';
import chromeBoiling from './chrome-boiling.webp';
import chromeFaucet from './chrome-faucet.webp';

import brushedNickelSparkling from './brushed-nickel-sparkling.webp';
import brushedNickelBoiling from './brushed-nickel-boiling.webp';
import brushedNickelFaucet from './brushed-nickel-faucet.webp';

import orBrosseSparkling from './or-brosse-sparkling.webp';
import orBrosseBoiling from './or-brosse-boiling.webp';
import orBrosseFaucet from './or-brosse-faucet.webp';

import gunMetalSparkling from './gun-metal-sparkling.webp';
import gunMetalBoiling from './gun-metal-boiling.webp';
import gunMetalFaucet from './gun-metal-faucet.webp';

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
