import { Link } from "react-router-dom";
import logo from '../Res/logo.png';
import { HashLink} from 'react-router-hash-link';
import Footer from '../footer';
import Form from '../Form';
import React, { Component } from "react";

class Upload extends Component{

  componentDidMount() {
    window.scrollTo(0, 0); //arrivi sempre nella parte alta della pagina
  }

  render(){
    return (
      <div>
          <header>

              <div className="logo">
              <img src={logo} />
              </div>

              <ul className="menu">
              <li><Link to="/">Home</Link> </li>
              <li><p>Upload CSV</p></li>
              </ul>

              <div className="cta">
              <HashLink to="#footer" className="button">Contatti</HashLink>
              </div>
          </header>

          <div className="hero hero_csv">
              <div className="hero__content">
                  <h1 className="big-text">Inserisci il tuo CSV</h1>
              </div>
          </div>

          <Form />
          <Footer id="footer"/>

      </div>
    );
  }
}

export default Upload;