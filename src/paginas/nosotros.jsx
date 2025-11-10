function Nosotros() {
  return (
    <div className="contenedor-principal">
      <div className="cuadro">

        <div className="nosotros-header">
          <h1>Sobre Nosotros</h1>
          <p>Descubre la historia detrás de MercadoVkei y nuestro amor por la moda japonesa</p>
        </div>
        

        <div className="nosotros-content">
          <div className="nosotros-text">
            <h2>Nuestra Historia</h2>
            <p>MercadoVkei nació en 2025 de la pasión por la moda visual kei y la cultura japonesa (Y que teníamos que hacer un trabajo xd). Todo comenzó como un pequeño emprendimiento entre amigos que querían compartir su amor por este estilo único con otros entusiastas en Latinoamérica.</p>
            <p>Con el tiempo, hemos crecido hasta convertirnos en la tienda online líder especializada en moda Visual Kei, ofreciendo una cuidadosa selección de prendas, accesorios y calzado inspirados en las tendencias de Harajuku y las bandas japonesas más icónicas.</p>
            <p>Hoy en día, trabajamos directamente con diseñadores japoneses y proveedores locales que comparten nuestra visión de llevar la estética Visual Kei a nuevas audiencias, manteniendo siempre la autenticidad y calidad que nos caracteriza.</p>
          </div>
          
          <div className="nosotros-image">
            <img 
              src="https://pm1.aminoapps.com/7130/5941d5f043e1fe1b05577f146928cc68ac84e61fr1-1022-498v2_hq.jpg" 
              alt="Tienda MercadoVkei" 
            />
          </div>
        </div>
        

        <div className="values-section">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-star"></i>
              <h3>Calidad</h3>
              <p>Seleccionamos cada producto con el máximo cuidado para garantizar su durabilidad y autenticidad.</p>
            </div>
            
            <div className="value-card">
              <i className="fas fa-heart"></i>
              <h3>Pasión</h3>
              <p>Amamos lo que hacemos y compartimos esa pasión con nuestra comunidad de clientes.</p>
            </div>
            
            <div className="value-card">
              <i className="fas fa-handshake"></i>
              <h3>Confianza</h3>
              <p>Construimos relaciones duraderas basadas en la honestidad y transparencia con nuestros clientes.</p>
            </div>
          </div>
        </div>
        

        <div className="team-section">
          <h2>Nuestro Equipo</h2>
          <div className="team-members">
            <div className="team-member">
              <img 
                src="https://www.lacuarta.com/resizer/v2/HKF726G5JFCABA5QG7YOF3EFWM.jpeg?auth=93f34a892320801c1560141ac6e56f71e09c4c00557eb5eaa4c5118fd0f3196d&smart=true&width=800&height=1262&quality=70" 
                alt="El coleccionista - Fundador & CEO" 
              />
              <h4>EL coleccionista</h4>
              <p>Fundador & CEO</p>
            </div>
            
            <div className="team-member">
              <img 
                src="https://ih1.redbubble.net/image.5775633060.4046/st,small,507x507-pad,600x600,f8f8f8.jpg" 
                alt="Mish Mishinson - Otroxd" 
              />
              <h4>Mish Mishinson</h4>
              <p>Otroxd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;