import "@app/App.css";
import Navbar from "@widgets/Navbar";

import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
