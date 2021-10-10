import React from 'react';

import { useAppVersionDetector } from '@/hooks/useAppVersionDetector';

export const App: React.FC = () => {
  const { updateAvailable } = useAppVersionDetector();

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <header>
        <small className="text-small text-gray-500 font-semibold tracking-wide uppercase">Header</small>
      </header>

      {!!updateAvailable && (
        <aside className="text-white px-6 py-4 border-0 rounded bg-gray-700">
          A new application version is available.{' '}
          <button className="font-semibold underline" onClick={() => window.location.reload()}>
            Click here
          </button>{' '}
          to reload your browser.
        </aside>
      )}

      <main>
        <small className="text-small text-gray-500 font-semibold tracking-wide uppercase">Main</small>
      </main>

      <footer className="divide-y-2 divide-gray-900">
        <small className="text-small text-gray-500 font-semibold tracking-wide uppercase">Footer</small>
      </footer>
    </div>
  );
};
