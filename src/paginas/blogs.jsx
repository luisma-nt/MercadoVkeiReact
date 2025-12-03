import { Link } from 'react-router-dom';
import { useState } from 'react';

function BlogGrid() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregar la lógica para manejar la suscripción
    console.log('Email suscrito:', email);
    alert('¡Gracias por suscribirte!');
    setEmail('');
  };

  return (
    <>
     
      <div className="blogs-banner">
        <div className="container">
          <h1>Nuestro Blog</h1>
          <p>Descubre las últimas tendencias en moda Visual Kei, consejos de estilo y noticias del mundo J-Rock</p>
        </div>
      </div>

      
      <div className="blogs-grid">
        
        <div className="blog-card">
          <div className="blog-image">
            <img 
              src="https://www.mapascompass.cl/cdn/shop/files/Stgo_2_1400x.jpg?v=1684442431" 
              alt="Tendencias Visual Kei 2024" 
            />
          </div>
          <div className="blog-content">
            <div className="blog-date">15 Marzo, 2025</div>
            <h3 className="blog-title">Nueva Tienda en Santiago Centro</h3>
            <p className="blog-excerpt">
              Estamos felices de anunciar la apertura de nuestra nueva tienda física en Santiago Centro. 
              Aquí podrás encontrar todos nuestros productos de moda Visual Kei y accesorios japoneses 
              en un espacio diseñado especialmente para los fanáticos de la cultura japonesa...
            </p>
            <Link to="/noticia1" className="blog-link">Leer más</Link>
          </div>
        </div>

        
        <div className="blog-card">
          <div className="blog-image">
            <img 
              src="https://64.media.tumblr.com/190b005e962fa5abc6102119a7ee099c/tumblr_pjk9xwqADa1qa56e5o1_1280.jpg" 
              alt="Conciertos J-Rock 2024" 
            />
          </div>
          <div className="blog-content">
            <div className="blog-date">28 Febrero, 2025</div>
            <h3 className="blog-title">Gran aceptación en la comunidad</h3>
            <p className="blog-excerpt">
              Desde la apertura de MercadoVkei hemos recibido una acogida increíble por parte de la comunidad. 
              Cientos de clientes han confiado en nosotros y han compartido su entusiasmo por la moda Visual Kei, 
              lo que nos motiva a seguir creciendo y mejorando cada día.
            </p>
            <Link to="/noticia2" className="blog-link">Leer más</Link>
          </div>
        </div>

        
        <div className="blog-card">
          <div className="blog-image">
            <img 
              src="https://live.staticflickr.com/7020/6545124259_686d5a23d1_z.jpg" 
              alt="Historia Visual Kei" 
            />
          </div>
          <div className="blog-content">
            <div className="blog-date">10 Enero, 2025</div>
            <h3 className="blog-title">Información adicional</h3>
            <p className="blog-excerpt">Información adicional sobre nuestro negocio</p>
            <Link to="/inf_ad" className="blog-link">Leer más</Link>
          </div>
        </div>
      </div>

      
      <div className="subscribe-section">
        <div className="container">
          <h2>¿No quieres perderte ninguna actualización?</h2>
          <p>Suscríbete a nuestro newsletter y recibe las últimas noticias y tendencias directamente en tu email.</p>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              className="subscribe-input" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button type="submit" className="subscribe-btn">Suscribirse</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BlogGrid;