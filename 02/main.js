const text = await Deno.readTextFile('./input.txt');

const lines = text.split(`\n`);

const answer1 = part1(lines);
const answer2 = part2(lines);

console.log(answer1, answer2);

function part1(lines) {
  return lines.reduce((accumulator, line) => {
    const parts = line.split(' ');

    if (parts.length !== 3) return;

    const [min, max] = parts[0].match(/\d+/g);
    const character = parts[1].trim().replace(':', '');
    const re = new RegExp(character, 'g');
    const count = (parts[2].trim().match(re) || []).length;
    const isValid = count >= min && count <= max;

    return accumulator + (isValid ? 1 : 0);
  }, 0);
}

function part2(lines) {
  return lines.reduce((accumulator, line) => {
    const parts = line.split(' ');

    if (parts.length !== 3) return;

    const [index1, index2] = parts[0].match(/\d+/g);
    const character = parts[1].trim().replace(':', '');

    // check if the position has the character
    const position1 = parts[2][index1 - 1] === character;
    const position2 = parts[2][index2 - 1] === character;
    const isValid = position1 + position2 === 1;

    return accumulator + (isValid ? 1 : 0);
  }, 0);
}
