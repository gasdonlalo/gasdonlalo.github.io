// import Session from "./components/Provider/Session";
import "./App.css";
import Rutas from "./routes/Rutas";
import Auth from "./components/Provider/auth";
import PermisoUsuario from "./components/Provider/PermisoUsuario";
function App() {
  return (
    <div>
      <Auth>
        <PermisoUsuario>
          <Rutas />
        </PermisoUsuario>
      </Auth>
    </div>
  );
}

export default App;
