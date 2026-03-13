import "./App.css";

import Navbar from "@/components/layout/Navbar";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <main className=" page-shell max-w-6xl mx-auto p-6 flex justify-center w-full py-16">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
