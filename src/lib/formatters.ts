const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
});

export function formatCompactNumber(number: number) {
  return compactNumberFormatter.format(number);
}
