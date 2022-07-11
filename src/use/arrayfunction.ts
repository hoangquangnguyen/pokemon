function shuffle(array: number[]): number[] {
  array = [...array];

  for (let index = array.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[newIndex]] = [array[newIndex], array[index]];
  }

  return array;
}
function getN_elemental(array: number[], n: number): number[] {
  return array.slice(0, n);
}

export function ArrayFunction() {
  return { shuffle, getN_elemental };
}
