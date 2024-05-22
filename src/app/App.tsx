import "@app/App.css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <Link to="/">Main Page</Link> | <Link to="/sub">Sub Page</Link>
      <AppRoutes />
    </Router>
  );
}

export default App;
