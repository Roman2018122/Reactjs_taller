import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img
            src={heroImg}
            className="base"
            width="170"
            height="179"
            alt="Taller Mecánico"
          />
        </div>

        <div>
          <h1>🚗 Bienvenidos a Taller Mecánico uwu</h1>

          <p>
            Sistema de gestión para la administración de clientes, vehículos,
            citas, órdenes de trabajo y servicios de un taller mecánico.
          </p>

          <h3>Autor</h3>
          <p>Jonathan Torres</p>
        </div>
      </section>
    </>
  )
}

export default App