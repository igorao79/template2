export function getAssetPath(path: string): string {
  // В production на GitHub Pages нужен префикс /template2
  const basePath = process.env.NODE_ENV === 'production' ? '/template2' : '';
  return `${basePath}${path}`;
} 