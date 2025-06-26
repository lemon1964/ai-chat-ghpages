// // ai-chat-ghpages/src/utils/formatFileUrl.ts
// export const formatFileUrl = (fileUrl: string) => {
//   return fileUrl;
// };


export const formatFileUrl = (fileUrl: string): string => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '/';

  // Если абсолютный URL (http, https), оставляем как есть
  if (/^https?:\/\//.test(fileUrl)) return fileUrl;

  // Если начинается с '/', убираем его, чтобы не было двойного слэша
  const cleanPath = fileUrl.startsWith('/') ? fileUrl.slice(1) : fileUrl;

  return base.endsWith('/')
    ? `${base}${cleanPath}`
    : `${base}/${cleanPath}`;
};
