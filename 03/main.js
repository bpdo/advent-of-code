const text = await Deno.readTextFile('./input.txt');

const lines = text.split(`\n`);

const answer1 = part1(lines);
const answer2 = part2(lines);

console.log(answer1, answer2);

function part1(lines, x = 3, y = 1) {
  let trees = 0;

  // calculate how many times to repeat the row
  const n = Math.ceil((lines.length / lines[0].length) * x);

  for (let i = 0; i < lines.length; i += y) {
    const line = lines[i].repeat(n);

    // calc the x position
    const xPosition = (i / y) * x;

    // if the character is a # then it's a tree
    if (line[xPosition] === '#') trees++;
  }

  return trees;
}

function part2(lines) {
  const t1 = part1(lines, 1, 1);
  const t2 = part1(lines, 3, 1);
  const t3 = part1(lines, 5, 1);
  const t4 = part1(lines, 7, 1);
  const t5 = part1(lines, 1, 2);

  return t1 * t2 * t3 * t4 * t5;
}
