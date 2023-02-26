// import Session from "./components/Provider/Session";
import "./App.css";
import Rutas from "./routes/Rutas";
import Auth from "./components/Provider/Auth";
import PermisoUsuario from "./components/Provider/PermisoUsuario";
import Checklist, { Datos } from "./components/Provider/Checklist";

function App() {
  return (
    <div>
      <Auth>
        <PermisoUsuario>
          <Checklist>
            <Rutas />
          </Checklist>
        </PermisoUsuario>
      </Auth>
    </div>
  );
}

export default App;
