export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen d-flex flex-column bg-light">
      
      <header className="bg-primary text-white p-3 shadow-sm">
        <h3 className="text-center mb-0">CareMeds — Medicine Availability System</h3>
      </header>

      <main className="container flex-grow-1 py-4">
        {children}
      </main>

      <footer className="bg-white border-top text-center py-3 small">
        © 2026 CareMeds | AUST CSE
      </footer>

    </div>
  );
}
