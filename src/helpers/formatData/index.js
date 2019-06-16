export const shortCap = (number, maxPlaces, forcePlaces, forceLetter) => {
  number = Number(number); // eslint-disable-line no-param-reassign
  forceLetter = forceLetter || false; // eslint-disable-line no-param-reassign

  if (forceLetter !== false) {
    return annotate(number, maxPlaces, forcePlaces, forceLetter);
  }

  let abbr;

  if (number >= 1e12) {
    abbr = 'T';
  } else if (number >= 1e9) {
    abbr = 'B';
  } else if (number >= 1e6) {
    abbr = 'M';
  } else if (number >= 1e3) {
    abbr = 'K';
  } else {
    abbr = '';
  }

  return annotate(number, maxPlaces, forcePlaces, abbr);
};

const annotate = (number, maxPlaces, forcePlaces, abbr) => {
    // set places to false to not round
  let rounded = 0;

  switch (abbr) {
  case 'T':
    rounded = number / 1e12;
    break;
  case 'B':
    rounded = number / 1e9;
    break;
  case 'M':
    rounded = number / 1e6;
    break;
  case 'K':
    rounded = number / 1e3;
    break;
  case '':
    rounded = number;
    break;
  default:
    break;
  }

  if (maxPlaces !== false) {
    const test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');

    if (test.test(('' + rounded))) {
      rounded = rounded.toFixed(maxPlaces);
    }
  }

  if (forcePlaces !== false) {
    rounded = Number(rounded).toFixed(forcePlaces);
  }
  return rounded + abbr;
};

// If less than $1 use 4 decimals otherwise use standard 2 decimal
export const decimalDecider = (n) => (n < 1 ? 4 : 2);

// Use decimalDecider to conditionally assign decimal value
export const priceF = (n) => parseFloat(n).toFixed(decimalDecider(n)).replace(/\d(?=(\d{3})+\.)/g, '$&,');

