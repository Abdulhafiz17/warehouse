export function countOrdinalNumber(index, page, limit) {
  let start = null,
    numbers = [];
  start = (page - 1) * limit;
  for (let i = 0; i < limit; i++) {
    numbers.push(start);
    start++;
  }
  return numbers[index] + 1;
}
