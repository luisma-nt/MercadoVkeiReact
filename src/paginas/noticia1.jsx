function Noticia1() {
  return (
    

    <div className="contenedor-principal">

      <div className="cuadro">

        <div className="nosotros-header">
          <h2>Una experiencia única</h2>
        </div>
        
        <div className="nosotros-image">
          
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-70.6800%2C-33.4600%2C-70.6500%2C-33.4400&layer=mapnik&marker=-33.444387, -70.649326"
            width="100%"
            height="400"
            style={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            title="Ubicación de MercadoVkei en Santiago Centro"
            allowFullScreen
          />
        </div>

        <div className="nosotros-content">
          <div className="nosotros-text">
            <br />
            <p>Estamos felices de anunciar la apertura de nuestra nueva tienda física en <strong>Santiago Centro</strong>. 
               Aquí podrás encontrar todos nuestros productos de moda Visual Kei y accesorios japoneses en un espacio diseñado especialmente para los fanáticos de la cultura japonesa.</p>
            <p>La tienda contará con secciones dedicadas a ropa, calzado, accesorios y colecciones exclusivas que no encontrarás online. Además, tendremos actividades especiales, lanzamientos de temporada y descuentos para quienes nos visiten en persona.</p>
            <p>Queremos acercar aún más la moda japonesa a nuestros clientes y crear un punto de encuentro para la comunidad Visual Kei en Chile.</p>
          </div>
        </div>

        <div className="values-section">
          <h2>¿Dónde encontrarnos?</h2>
          <p className="text-center">📍 Nuestra tienda está ubicada en pleno <strong>Santiago Centro, cerca de la estación de Metro Universidad de Chile</strong>.</p>
          <p className="text-center">Horario: Lunes a Sábado, de 10:00 a 20:00 hrs.</p>
          <p className="text-center">📞 Teléfono: +56 9 1234 5678</p>
          <p className="text-center">✉️ Email: contacto@mercadovkei.cl</p>
          <div className="text-center">
            <a 
              href="https://www.openstreetmap.org/?mlat=-33.4489&mlon=-70.6693#map=17/-33.4489/-70.6693" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-mercado"
              style={{ display: 'inline-block', marginTop: '1rem' }}
            >
              Ver mapa más grande
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticia1;