import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
