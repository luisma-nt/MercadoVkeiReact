


function Carousel({ images = [] }) {

  const defaultImages = [
    {
      src: "https://energeek.cl/wp-content/uploads/2025/08/GzWv89kbMAAFpoE.webp",
      alt: "Productos destacados"
    },
    {
      src: "https://laarcadiadeurias.com/wp-content/uploads/2010/07/tetsuera.jpg",
      alt: "Nueva colección"
    },
    {
      src: "https://i1.sndcdn.com/avatars-QHIzUXQC0XLoUqff-KKu6rA-t1080x1080.jpg",
      alt: "Ofertas especiales"
    }
  ];

const carouselImages = [...defaultImages, ...images];


  return (
    <div className="container">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">  
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button 
              key={index}
              type="button" 
              data-bs-target="#carouselExampleIndicators" 
              data-bs-slide-to={index} 
              className={index === 0 ? "active" : ""} 
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        
        <div className="carousel-inner">
          {carouselImages.map((image, index) => (
            <div 
              key={index} 
              className={index === 0 ? "carousel-item active" : "carousel-item"}
            >
              <img 
                src={image.src} 
                className="d-block w-100" 
                alt={image.alt} 
              />
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#carouselExampleIndicators" 
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#carouselExampleIndicators" 
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;