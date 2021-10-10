import React from 'react';

const VERSION = process.env.VERSION!;
const VERSION_URL = process.env.VERSION_URL!;
/**
 * For testing purposes I will use 1000ms, so the check will run
 * every second. Adjust this value to a few minutes in production,
 * depending on how frequently you want to check for updates.
 * I recommend using 5 * 60 * 1000 (every 5 minutes).
 */
const CHECK_INTERVAL = 1000;

export const useAppVersionDetector = () => {
  const interval = React.useRef<ReturnType<typeof setTimeout>>();
  const [updateAvailable, setUpdateAvailable] = React.useState(false);

  const checkForUpdates = React.useCallback(() => {
    return fetch(VERSION_URL)
      .then((response): Promise<{ version: string }> => response.json())
      .then((data) => setUpdateAvailable(VERSION !== data.version))
      .catch(() => null);
  }, [setUpdateAvailable]);

  React.useEffect(() => {
    if (!updateAvailable && VERSION && VERSION_URL) {
      interval.current = setInterval(checkForUpdates, CHECK_INTERVAL);
    }

    return () => {
      if (interval.current) clearTimeout(interval.current);
    };
  }, [updateAvailable, checkForUpdates]);

  return { updateAvailable };
};
