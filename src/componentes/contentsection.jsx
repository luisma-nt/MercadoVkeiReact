import { Link } from "react-router-dom"


function ContentSection() {
  return (
    <div className="container content-section">
      <div className="row">
        <div className="col-md-4">
          <div className="content-card text-center">
            <h3>Productos Destacados</h3>
            <p>Descubre nuestros artículos más populares de visual kei y J-rock.</p>
            <Link to = '/productos' className="btn-mercado">Ver productos</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="content-card text-center">
            <h3>Novedades</h3>
            <p>Mantente al día con las últimas tendencias y lanzamientos.</p>
            <Link to ='/blogs' className="btn-mercado">Leer blog</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="content-card text-center">
            <h3>Ofertas Especiales</h3>
            <p>Aprovecha nuestros descuentos y promociones exclusivas.</p>
            <Link to = '/productos' className="btn-mercado">Ver ofertas</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentSection;
