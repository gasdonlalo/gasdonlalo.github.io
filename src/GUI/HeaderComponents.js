import { Link } from "react-router-dom";

const HeaderComponents = ({ urlBack, textUrlback, title, children }) => {
  return (
    <div>
      <div>
        <div className="d-flex justify-content-between border-bottom align-items-center">
          <div>
            <Link className="Link-primary" to={urlBack}>
              {textUrlback}
            </Link>

            <h4>{title}</h4>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

HeaderComponents.defaultProps = {
  urlBack: "/",
  textUrlback: "Regresar al inicio",
  title: "Titulo por defecto",
  children: false,
};

export default HeaderComponents;
