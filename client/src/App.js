import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./components/MyRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <MyRoutes />
      </Router>
    </div>
  );
}

export default App;
