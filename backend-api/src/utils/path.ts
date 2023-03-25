import path from 'path';

export const storagePath = (filepath?: string): string => {
  if (filepath !== undefined) {
    return path.join(__dirname, '../../storage', filepath);
  } else {
    return path.join(__dirname, '../../storage');
  }
};
