import { useMemo } from 'react';

const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `Just now`;
  if (minutes < 60) return `Posted ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `Posted ${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return `Posted ${days} day${days !== 1 ? 's' : ''} ago`;
};

const useRelativeTime = (dateString: string) => {
  return useMemo(() => getRelativeTime(dateString), [dateString]);
};

export default useRelativeTime;
