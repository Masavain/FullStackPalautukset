import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikkia: 0,
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
        const Button = ({ onClick, text }) => (
            <button onClick={onClick}>
                {text}
            </button>
        )
        const Statistics = () => {
            if (this.state.kaikkia === 0)
                return (
                    <div>
                        <h2>statistiikka</h2>
                        <p>ei yhtään palautetta annettu</p>
                    </div>
                )
            return (
                <div>
                    <h2>statistiikka</h2>
                    <Statistic statistiikka={this.state.hyva} text="hyvä" />
                    <Statistic statistiikka={this.state.neutraali} text="neutraali" />
                    <Statistic statistiikka={this.state.huono} text="huono" />
                    <Statistic statistiikka={keskiarvo()} text="keskiarvo" />
                    <Statistic statistiikka={positiivisia()} text="positiivisia" />
                </div>
            )
        }

        const Statistic = ({ statistiikka, text }) => {
            if (text === "positiivisia")
                return (
                    <div>
                        {text} {statistiikka} %
                </div>
                )
            return (
                <div>
                    {text} {statistiikka}
                </div>
            )
        }

        const keskiarvo = () => Math.round(((this.state.hyva - this.state.huono) / this.state.kaikkia) * 100) / 100
        const positiivisia = () => Math.round(((this.state.hyva) / this.state.kaikkia) * 100) * 100 / 100


        return (
            <div>
                <div>
                    <h2>anna palautetta</h2>
                </div>
                <Button onClick={this.klikHyva} text="hyvä" />
                <Button onClick={this.klikNeut} text="neutraali" />
                <Button onClick={this.klikHuono} text="huono" />
                <Statistics />

            </div>

        )
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
)