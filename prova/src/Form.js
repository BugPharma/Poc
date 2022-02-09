import React, {Component} from 'react'
import { convertCSVToArray } from 'convert-csv-to-array';

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();  
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const input = this.fileInput.current.files[0]; //prendo il CSV inserito
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            const data = convertCSVToArray(text);
            console.log(data);
            console.log(data[1]["common_name"]);
            console.log(data.length);
        };

        reader.readAsText(input);

    }

    render() {
        return (
            <div className="box">
                <div className="form">
                    <div className="title">Carica qui il CSV</div>
                    <div className="contenuto">
                        <form onSubmit={this.handleSubmit} id="myForm">
                            <div className="bottone">
                                <input type="file" accept=".csv" id="csvFile" ref={this.fileInput}/>
                            </div>
                            <div className=" elaborazione_form">
                                <button type="submit" className='button'>Elabora</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;