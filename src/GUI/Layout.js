import { Navigate, Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import auth from "../components/Provider/auth";

function Layout() {
  const path = useLocation();
  if (auth()) {
    return (
      <div className="flex_container">
        <div>
          <Header />
          <div className="section Content">{<Outlet />}</div>
        </div>

        {/* Pie de pagina */}
        <div>
          <div className="container-fluid">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-10 border-top">
              <div className="col-md-4 d-flex align-items-center">
                <span className="mb-3 mb-md-0 text-muted">
                  &copy; Gasolinera Don Lalo
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  } else {
    if (path.pathname !== "/auth") return <Navigate to="/auth" />;
  }
}
export default Layout;
