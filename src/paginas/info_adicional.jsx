import { Link } from 'react-router-dom';

function Info_ad() {
  return (
    <>
      <header className="hero-intro">
        <div className="hero-overlay">
          <h1>Bienvenidos a MercadoVkei</h1>
          <p>Tu lugar para descubrir la moda Visual Kei y la cultura japonesa</p>
          <Link to="/productos" className="btn-mercado">
            Explorar Productos
          </Link>
        </div>
      </header>


      <div className="contenedor-principal">
        <div className="cuadro intro-bloques">
          <div className="row text-center">
            <div className="col-md-4">
              <h3>Moda Única</h3>
              <p>Inspirada en las tendencias de Harajuku y las bandas japonesas más icónicas.</p>
            </div>
            <div className="col-md-4">
              <h3>Nuestra Historia</h3>
              <p>Nacimos de la pasión por el Visual Kei y el deseo de compartirlo con Latinoamérica.</p>
            </div>
            <div className="col-md-4">
              <h3>Comunidad</h3>
              <p>Un espacio inclusivo para todos los fans de la cultura japonesa y J-rock.</p>
            </div>
          </div>
          
          <div className="nosotros-image">
            <img 
              src="https://images.lacarmina.com/221215-visual-kei-jrock-cd-stores-shinjuku-tokyo-rock-music-record-shop-9.jpg" 
              alt="Tienda de Visual Kei en Tokio" 
            />
            <img 
              src="https://unmundodecosas.wordpress.com/wp-content/uploads/2013/02/v-7.jpg" 
              alt="Bandas de Visual Kei" 
              height="480px" 
            />  
          </div>
        </div>
      </div>
    </>
  );
}

export default Info_ad;