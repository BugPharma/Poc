import React, {Component} from 'react'
import logo from './Res/logo.png';

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-3" id="footer">
                <div className="grid">
                <div className="col">
                    <div className="logo logo__footer">
                    <img src={logo} alt="" />
                    </div>
                </div>
                <div className="col">
                    <h4 className="tw">P.IVA</h4>
                    <p className="tw">05006900962</p>
                </div>
                <div className="col">
                    <h4 className="tw">Sede</h4>
                    <p className="tw">Via Solferino, 1, 26900 Lodi LO</p>
                </div>
                <div className="col">
                    <h4 className="tw">PEC</h4>
                    <p className="tw">zucchettispa@gruppozucchetti.it</p>
                </div>
                </div>
            </footer>
        );
    }
}

export default Footer;