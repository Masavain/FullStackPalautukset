import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikkia: 0
        }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            kaikkia: this.state.kaikkia + 1
        })
    }

    klikNeut = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            kaikkia: this.state.kaikkia + 1

        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            kaikkia: this.state.kaikkia + 1

        })
    }



    render() {
        const keskiarvo = () => {
            if (this.state.kaikkia === 0) {
                return (
                    <div>
                        keskiarvo 0
                    </div>
                )
            }
            return (
                <div>
                    keskiarvo {Math.round(((this.state.hyva - this.state.huono) / this.state.kaikkia) * 100) / 100}
                </div>
            )
        }

        const positiivisia = () => {
            return (
                <div>
                    positiivisia {Math.round(((this.state.hyva) / this.state.kaikkia) * 100) * 100 / 100} %
            </div>
            )
        }

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
                    <div>hyvä {this.state.hyva}</div>
                    <div>neutraali {this.state.neutraali}</div>
                    <div>huono {this.state.huono}</div>
                    {keskiarvo()}
                    {positiivisia()}
                </div>
            </div>

        )
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
)