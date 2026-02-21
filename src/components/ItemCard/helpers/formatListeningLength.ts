const pluralize = (count: number, singular: string) =>
  count === 1 ? `1 ${singular}` : `${count} ${singular}s`;

export const formatListeningLength = (ms: number): string => {
  const totalMinutes = Math.floor(ms / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(pluralize(hours, 'hour'));
  }

  if (minutes > 0) {
    parts.push(pluralize(minutes, 'minute'));
  }

  return parts.length > 0 ? parts.join(' ') : '0 minutes';
};
