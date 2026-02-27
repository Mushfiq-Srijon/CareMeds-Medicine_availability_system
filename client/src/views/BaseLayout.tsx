import Navigation from '../components/Navigation';
import { useLocation } from 'react-router-dom';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // hide navigation on certain auth pages
  const hideNavPaths = ['/login', '/register'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen d-flex flex-column bg-light">
      {showNav && <Navigation />}

      <main className="container flex-grow-1 py-4">
        {children}
      </main>

      <footer className="bg-white border-top text-center py-3 small">
        © 2026 CareMeds | AUST CSE
      </footer>

    </div>
  );
}
