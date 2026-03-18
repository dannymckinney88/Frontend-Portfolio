import Navbar from '@/components/layout/Navbar';
import AppRoutes from '@/routes/AppRoutes';

import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <main className="app-shell page-shell">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
