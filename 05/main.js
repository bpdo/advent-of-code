const text = await Deno.readTextFile('./input.txt');

const lines = text.split(`\n`);

const answer1 = part1(lines);
const answer2 = part2(lines);

console.log(answer1, answer2);

function part1(lines) {
  const ids = lines.map(line => {
    const rowBytes = line.substring(0, 7).replaceAll('F', 0).replaceAll('B', 1);
    const row = Number.parseInt(rowBytes, 2);

    const columnBytes = line
      .substring(7)
      .replaceAll('L', '0')
      .replaceAll('R', '1');
    const column = Number.parseInt(columnBytes, 2);

    return row * 8 + column;
  });

  return Math.max(...ids);
}

function part2(lines) {
  const ids = lines
    .map(line => {
      const rowBytes = line
        .substring(0, 7)
        .replaceAll('F', 0)
        .replaceAll('B', 1);
      const row = Number.parseInt(rowBytes, 2);

      const columnBytes = line
        .substring(7)
        .replaceAll('L', '0')
        .replaceAll('R', '1');
      const column = Number.parseInt(columnBytes, 2);

      return row * 8 + column;
    })
    .sort((a, b) => a - b); // sort the ids

  for (let i = 0; i < ids.length - 1; i++) {
    if (ids[i] === ids[i + 1] - 1) continue;

    return ids[i] + 1;
  }

  return id;
}
