import "./App.css";

import Navbar from "@/components/layout/Navbar";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <main className="page-shell mx-auto w-full max-w-6xl px-6 py-16">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
