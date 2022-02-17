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
            <li><Link to="/upload">Carica CSV</Link></li>
          </ul>

          <div className="cta">
          <HashLink to="#footer" className="button">Contatti</HashLink>
          </div>
        </header>


        <div className="hero">
          <div className="hero__content">
            <p className="intro-text">Sicurezza first</p>
            <h1 className="big-text">Login warrior</h1>
            <Link to="/upload" className="button plr-1">Prova con il tuo CSV</Link>
            {/* <HashLink to="#scopri" className="button plr-1">Scopri</HashLink>  */}
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
              {/* <HashLink to="#footer" className="button">Contattaci</HashLink> */}
          </div>
        </div>

        <div className="bg--cover mt-3">
          <div className="bg--cover__title">
            <h3 className="big-text tw">Grafici da creare</h3>
          </div>
          
          <div className="bg--cover__text">

            <h4 className="tw normal-text">Scatter Plot</h4>
            <p className="tw">Un grafico di dispersione è spesso usato quando una delle variabili è sotto controllo dello sperimentatore.<br/> Un parametro che è incrementato e/o decrementato sistematicamente è chiamato parametro di controllo o variabile indipendente, ed è arbitrariamente posto sull'asse orizzontale.<br/> La variabile misurata (o dipendente) è arbitrariamente posta sull'asse verticale. Se non esistono variabili dipendenti, ogni variabile può essere messa su un asse a piacere. Il grafico di dispersione può' essere utile per visualizzare il grado di correlazione (cioè di dipendenza lineare) tra le due variabili.</p>

            <h4 className="tw normal-text">Parallel coordinates</h4>
            <p className="tw">Le coordinate parallele sono un sistema comunemente utilizzato per visualizzare spazi n-dimensionali e analizzare dati multivariati. Per mostrare un insieme di punti in uno spazio a n dimensioni, vengono disegnate n linee parallele, solitamente verticali e poste a uguale distanza l'una dall'altra. Un punto nello spazio n-dimensionale è rappresentato come una linea spezzata con i vertici sugli assi paralleli. La posizione del vertice sull'i-esimo asse corrisponde all'i-esima coordinata del punto.</p>

            <h4 className="tw normal-text">Force-directed graph</h4>
            <p className="tw">Gli algoritmi di disegno di grafici forzati sono una classe di algoritmi per disegnare grafici in modo esteticamente gradevole. Il loro scopo è posizionare i nodi di un grafo nello spazio bidimensionale o tridimensionale in modo che tutti gli spigoli siano di lunghezza più o meno uguale e vi siano il minor numero possibile di archi di attraversamento, assegnando forze tra l'insieme degli spigoli e l'insieme dei nodi, in base alle loro posizioni relative, e quindi utilizzare queste forze per simulare il movimento dei bordi e dei nodi o per ridurre al minimo la loro energia. [2]Sebbene il disegno di grafi possa essere un problema difficile, gli algoritmi a forza diretta, essendo simulazioni fisiche, di solito non richiedono conoscenze speciali sulla teoria dei grafi come la planarità.</p>

            <h4 className="tw normal-text">Sankey diagram</h4>
            <p className="tw pb-1">Il diagramma di Sankey è un particolare tipo di diagramma di flusso in cui l'ampiezza delle frecce è disegnata in maniera proporzionale alla quantità di flusso.Esso è usualmente utilizzato per indicare trasferimenti di energia, materiali, costi o dati in un processo.I diagrammi di Sankey accentuano visivamente i grandi trasferimenti o flussi all'interno di un sistema: sono perciò utili per individuare i contributi dominanti in un flusso complessivo.</p>
          </div>
        </div>

        <Footer />
    
      </div>
    );
  }
}

export default App;