import React from 'react'


import Carousel from '../componentes/carousel';
import ContentSection from '../componentes/contentsection';

function Home() {
    const customImages = [
    {
      src: "https://i.pinimg.com/736x/c3/78/5f/c3785f3ecafff3a388ffd2010d1537a0.jpg",
      alt: "Imagen personalizada 1"
    },
    {
      src: "https://2img.net/h/i595.photobucket.com/albums/tt38/Olivia_Reita/Malice%20Mizer/malice38.jpg", 
      alt: "Imagen personalizada 2"
    }
  ];

  return (
    <>
  
    
    <Carousel images={customImages}/>
    <ContentSection/>
    
  
    </>
    
  )
} 
export default Home;



