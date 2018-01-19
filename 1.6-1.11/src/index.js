import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikki: []
        }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
        })
    }

    klikNeut = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
        })
    }

    render() {

        return (
            <div>
                <div>
                    <h2>anna palautetta</h2>
                </div>
                <div>
                    <button onClick={this.klikHyva}>hyvä</button>
                    <button onClick={this.klikNeut}>neutraali</button>
                    <button onClick={this.klikHuono}>huono</button>
                </div>
                <div>
                    <h2>statistiikka</h2>
                </div>
                <div>
                   <p>hyvä {this.state.hyva}</p>
                   <p>neutraali {this.state.neutraali}</p>
                   <p>huono {this.state.huono}</p>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)