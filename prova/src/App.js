import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import logo from './Res/logo.png';
import data from './Res/data.jpg';
import Footer from './footer';


class App extends Component {
  render() {
    return (
      <div>
        <header>

          <div className="logo">
            <img src={logo} />
          </div>

          <ul className="menu">
            <li> <p>Home</p> </li>
            <li><Link to="/upload">Upload CSV</Link></li>
          </ul>

          <div className="cta">
          <HashLink to="#footer" className="button">Contatti</HashLink>
          </div>
        </header>


        <div className="hero">
          <div className="hero__content">
            <p className="intro-text">Sicurezza first</p>
            <h1 className="big-text">Login warrior</h1>
            <HashLink to="#scopri" className="button plr-1">Scopri</HashLink> 
          </div>
        </div>


        <div className="poster mt-3" id="scopri">
          <div className="poster__img">
            <img src={data} alt="" />
          </div>
          <div className="poster__content">
            <h3 className="big-text">Zucchetti S.p.A</h3>
            <p>Da oltre 40 anni Aziende, Professionisti e Associazioni di Categoria trovano in Zucchetti un partner che realizza
              soluzioni con la tecnologia più avanzata.Oggi siamo la prima software house in Italia per fatturato e con noi puoi 
              acquisire importanti vantaggi competitivi e avere un business di successo.<br/>Un'ampia e innovativa offerta di 
              soluzioni software, hardware e servizi ti permette di disporre della migliore soluzione sul mercato e di avvalerti 
              di un unico Partner in grado di soddisfare le tue esigenze tecnologiche.</p>
              <HashLink to="#footer" className="button">Contattaci</HashLink>
          </div>
        </div>

        <Footer />
    
      </div>
    );
  }
}

export default App;