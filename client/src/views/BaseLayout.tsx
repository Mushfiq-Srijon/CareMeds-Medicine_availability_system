import Navigation from '../components/Navigation';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen d-flex flex-column bg-light">
      
      <Navigation />

      

      <main className="container flex-grow-1 py-4">
        {children}
      </main>

      <footer className="bg-white border-top text-center py-3 small">
        © 2026 CareMeds | AUST CSE
      </footer>

    </div>
  );
}
