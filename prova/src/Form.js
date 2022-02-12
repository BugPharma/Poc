import React, {Component} from 'react'

import * as cose from './control.js';

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef(); 
        this.state = {
            arrayFinale : [],
            button: 1
        }; 
    }

    handleSubmit = event => {
        event.preventDefault();
        const input = this.fileInput.current.files[0]; //prendo il CSV inserito
        const reader = new FileReader();

        if(this.state.button === 1){
            reader.onload = function (e) {
                const text = e.target.result;
                const data = cose.csvToArray(text);
                console.log(data);
                console.log(data[1]["common_name"]);
                console.log(data.length);
                this.arrayFinale = cose.transformArray(data); 
                cose.manipulationDom(this.arrayFinale);
            };
        }

        else if (this.state.button === 2) {
            reader.onload = function (e) {
                const text = e.target.result;//stringa con tutto il risultato del file CSV
                const data = cose.csvToArray(text);
                cose.elab_druid(data);
              };
        }

        reader.readAsText(input);
        
    }

    render() {
        return (
            <div>
            <div className="box" id="contenitoreForm">
                <div className="form">
                    <div className="title">Carica qui il CSV</div>
                    <div className="contenuto">
                        <form  onSubmit={this.handleSubmit}  id="myForm">
                            <div className="bottone" id="csvFile">
                                <input type="file" accept=".csv" ref={this.fileInput}/>
                            </div>
                            <div className=" elaborazione_form">
                                <button onClick={() => (this.state.button = 1)} type="submit" className='button' id="bottone-input">Elabora</button>
                                <button onClick={() => (this.state.button = 2)} type="submit" className='button' id="bottone-input-druid">PCA</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="my_dataviz"></div>
            </div>
        );
    }
}

export default Form;