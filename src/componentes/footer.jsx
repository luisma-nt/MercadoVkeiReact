

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-center py-4" style={{ backgroundColor: '#bf93d1', color: 'white' }}>
      <div className="container-fluid">
        <p>&copy; {currentYear} MercadoVkei - Todos los derechos reservados</p>
        <p>Specializing in VisualVei and J-rock merchandise</p>
        <div className="mt-2">
        </div>
      </div>
    </footer>
  );
}
export default Footer;