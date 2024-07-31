import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar/Navbar";
import CreateAccountMain from "./components/CreateAccountMain/CreateAccountMain";
import CreatePassword from "./components/CreatePassword/CreatePassword";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <CreateAccountMain /> */}
      <CreatePassword />
    </div>
  );
}

export default App;
