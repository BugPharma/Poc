import { Link } from "react-router-dom";
import logo from '../Res/logo.png';
import { HashLink} from 'react-router-hash-link';
import Footer from '../footer';
import Grafico from '../Grafico';


export default function result() {
    return (
        <div>
        <header>

            <div className="logo">
            <img src={logo} />
            </div>

            <ul className="menu">
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/upload">Upload CSV</Link></li>
            </ul>

            <div className="cta">
            <HashLink to="#footer" className="button">Contatti</HashLink>
            </div>
        </header>

        <div className="hero hero_csv">
            <div className="hero__content">
                <h1 className="big-text">Risultato dell'elaborazione</h1>
            </div>
        </div>

        <Grafico />
        <Footer id="footer"/>

    </div>
    );
}