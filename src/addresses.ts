export
function getAddresses(text: string) {
  const lines = text.split('\n')
    .map((line) => line.trim())
    .filter((line) => line)
    .filter((line) => !line.startsWith('//'));
  return Array.from(new Set(lines));
}
