import { decodeString } from 'https://deno.land/std@0.80.0/encoding/hex.ts';

const text = await Deno.readTextFile('./input.txt');

const lines = text.split(`\n`);

// parse the documents
const documents = lines.reduce(
  (documents, line) => {
    !line
      ? documents.push('')
      : (documents[documents.length - 1] += ` ${line}`);

    return documents;
  },
  ['']
);

const answer1 = part1(documents);
const answer2 = part2(documents);

console.log(answer1, answer2);

function part1(documents) {
  const required = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:']; // 'cid:'

  return documents.reduce((valid, document) => {
    const isValid = required.every(field => document.includes(field));

    return valid + (isValid ? 1 : 0);
  }, 0);
}

function part2(documents) {
  const required = [
    values => {
      if (!values.hasOwnProperty('byr')) return false;

      const value = Number.parseInt(values['byr']);

      return value >= 1920 && value <= 2002;
    },
    values => {
      if (!values.hasOwnProperty('iyr')) return false;

      const value = Number.parseInt(values['iyr']);

      return value >= 2010 && value <= 2020;
    },
    values => {
      if (!values.hasOwnProperty('eyr')) return false;

      const value = Number.parseInt(values['eyr']);

      return value >= 2020 && value <= 2030;
    },
    values => {
      if (!values.hasOwnProperty('hgt')) return false;

      const hgt = values['hgt'];

      if (!hgt.endsWith('cm') && !hgt.endsWith('in')) return false;

      const isCM = hgt.endsWith('cm');

      const value = Number.parseInt(hgt.replace('cm', '').replace('in', ''));

      return isCM ? value >= 150 && value <= 193 : value >= 59 && value <= 76;
    },
    values => {
      if (!values.hasOwnProperty('hcl')) return false;
      if (values['hcl'].length !== 7) return false;

      try {
        decodeString(values['hcl'].replace('#', ''));
        return true;
      } catch {
        return false;
      }
    },
    values => {
      if (!values.hasOwnProperty('ecl')) return false;

      const options = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

      return options.includes(values['ecl']);
    },
    values => {
      if (!values.hasOwnProperty('pid')) return false;

      return !isNaN(values['pid']) && values['pid'].length === 9;
    },
  ];

  return documents.reduce((valid, document) => {
    const values = document
      .trim()
      .split(' ')
      .reduce((obj, field) => {
        // parse the key value pair
        const [key, value] = field.trim().split(':');

        // update the dictionary
        obj[key] = value;

        // return the dictionary
        return obj;
      }, {});

    const isValid = required.every(validation => validation(values));

    return valid + (isValid ? 1 : 0);
  }, 0);
}
