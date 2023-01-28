import Session from "./components/Provider/Session";
import "./App.css";
import Rutas from "./routes/Rutas";
function App() {
  return (
    <div>
      <Session.Provider
        value={JSON.parse(localStorage.getItem("Credentials")) || null}
      >
        <Rutas />
      </Session.Provider>
    </div>
  );
}

export default App;
