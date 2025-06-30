export const getAssetPath = (path: string): string => {
  const basePath = process.env.NODE_ENV === 'production' ? '/template2' : '';
  // Убираем начальный слеш, если он есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}; 