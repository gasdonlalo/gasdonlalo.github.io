import Header from "../components/Header";

function Layout({ children }) {
  return (
    <div className="flex_container">
      <div className="section">
        <Header />
      </div>
      <div className="section Content">{children}</div>
    </div>
  );
}
export default Layout;
