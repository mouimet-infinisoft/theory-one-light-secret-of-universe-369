export function extractContentByTag(input: string, tagName: string) {
  const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 'g');
  let match;
  const results = [];

  while ((match = regex.exec(input)) !== null) {
    results.push(match[1]);
  }

  return results;
}
