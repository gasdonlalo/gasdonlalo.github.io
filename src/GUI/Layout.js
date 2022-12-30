import Header from "../components/Header";

function Layout({ children }) {
  return (
    <div className="flex_container">
      <div>
      <Header />
      <div className="section Content">{children}</div>
      </div>

      {/* Pie de pagina */}
      <div>
        <div class="">
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-10 border-top">
            <div class="col-md-4 d-flex align-items-center">
              <span class="mb-3 mb-md-0 text-muted">
                &copy; Gasolinera Don Lalo
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    
  );
}
export default Layout;
