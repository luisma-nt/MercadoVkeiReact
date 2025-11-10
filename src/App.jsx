import { Route, Routes } from 'react-router-dom';
import Home from './paginas/home';
import NavBar from './componentes/navbar';
import Footer from './componentes/footer';
import Blogs from './paginas/blogs';
import Info_ad from './paginas/info_adicional';
import Noticia2 from './paginas/noticia2';
import Noticia1 from './paginas/noticia1';
import Nosotros from './paginas/nosotros';
import Productos from './paginas/productos';
import Producto from './paginas/producto';
import Carrito from './paginas/carrito';
import Ingresar from './paginas/ingresar';
import Registro from './paginas/registro';
import MiCuenta from './paginas/cuenta';


/*
npm install bootstrap  para bootsrap
npm i @popperjs/core  para que bootsrap funcione 

nmp i react-router-dom para los links */
function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<Producto />} /> 
        <Route path="/carrito" element={<Carrito />} />
        
        <Route path='/ingresar' element={<Ingresar />} /> 
        <Route path='/registrar' element={<Registro />} />


        <Route path='/mi-cuenta' element={<MiCuenta />} />

        
        <Route path='/nosotros' element={<Nosotros />}/>
        <Route path='/blogs' element={<Blogs />}/>
        <Route path='/noticia2' element={<Noticia2 />}/>
        <Route path='/noticia1' element={<Noticia1/>}/>
        <Route path='/inf_ad' element={<Info_ad />}/>
        <Route path='/ingresar' element={<div>Ingresar</div>}/>
        <Route path='/registrar' element={<div>Registrar</div>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App;