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


    klikkaus = (arvo) => {
        return () => {
            this.setState({
                [arvo]: this.state[arvo] + 1,
                kaikkia: this.state.kaikkia + 1
            })
        }

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
                    <table>
                        <tbody>
                            <Statistic statistiikka={this.state.hyva} text="hyvä" />
                            <Statistic statistiikka={this.state.neutraali} text="neutraali" />
                            <Statistic statistiikka={this.state.huono} text="huono" />
                            <Statistic statistiikka={keskiarvo()} text="keskiarvo" />
                            <Statistic statistiikka={positiivisia()} text="positiivisia" />
                        </tbody>
                    </table>
                </div>
            )
        }

        const Statistic = ({ statistiikka, text }) => {
            if (text === "positiivisia")
                return (
                    <tr>
                        <td>
                            {text}
                        </td>
                        <td>{statistiikka} %
                    </td>
                    </tr>
                )
            return (
                <tr>
                    <td>
                        {text}
                    </td>
                    <td>{statistiikka}
                    </td>
                </tr>
            )
        }

        const keskiarvo = () => Math.round(((this.state.hyva - this.state.huono) / this.state.kaikkia) * 100) / 100
        const positiivisia = () => Math.round(((this.state.hyva) / this.state.kaikkia) * 100) * 100 / 100


        return (
            <div>
                <div>
                    <h2>anna palautetta</h2>
                </div>
                <Button onClick={this.klikkaus('hyva')} text="hyvä" />
                <Button onClick={this.klikkaus('neutraali')} text="neutraali" />
                <Button onClick={this.klikkaus('huono')} text="huono" />
                <Statistics />

            </div>

        )
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
)