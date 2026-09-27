import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_ROUTE, ROUTES, normalizeRoute } from './routes';
import './app.css';

function routeFromWindow() {
  return normalizeRoute(window.location.hash);
}

export default function App() {
  const [route, setRoute] = useState(routeFromWindow);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = DEFAULT_ROUTE;
    }

    const onHashChange = () => setRoute(routeFromWindow());
    const onMessage = event => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'mise:navigate' && ROUTES[event.data.route]) {
        if (window.location.hash !== `#${event.data.route}`) {
          window.location.hash = event.data.route;
        } else {
          setRoute(event.data.route);
        }
      }
    };

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  const screenFolder = ROUTES[route] || ROUTES[DEFAULT_ROUTE];
  const screenSrc = useMemo(
    () => `/screens/${screenFolder}/index.html?appRoute=${encodeURIComponent(route)}`,
    [screenFolder, route]
  );

  return (
    <main className="app-frame" aria-label="Restaurant Inventory & Operations">
      <iframe
        key={screenSrc}
        className="screen-frame"
        src={screenSrc}
        title={`Restaurant Inventory & Operations — ${route}`}
      />
    </main>
  );
}
