import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0],
            most: 0
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    klikkaus = () => {
        return () => {
            this.setState({
                selected: this.getRandomInt(0, 5)
            })
        }
    }

    vote = (aania) => {
        return () => {
            let a = this.state.votes
            a[this.state.selected] = this.state.votes[this.state.selected] + 1
            this.setState({
                votes: a

            })
        }
    }

    render() {
        const Button = ({ onClick, text }) => (
            <button onClick={onClick}>
                {text}
            </button>
        )

        const Anekdootti = ({ indeksi }) => {
            return (
                <div>
                    <div>
                        {this.props.anecdotes[indeksi]}
                    </div>
                    <div>
                        has {this.state.votes[indeksi]} votes
                </div>
                </div>

            )
        }

        const eniten = () => {
            var arr = this.state.votes
            if (arr.length === 0) {
                return -1;
            }

            var max = arr[0];
            var maxIndex = 0;

            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    maxIndex = i;
                    max = arr[i];
                }
            }

            return maxIndex;
        }

        return (

            <div>

                <div>
                    <Anekdootti indeksi={this.state.selected} />
                </div>
                <div>
                    <Button onClick={this.vote()} text="vote" />
                    <Button onClick={this.klikkaus()} text="next anecdote" />
                </div>
                <div>
                    <h3>anecdote with most votes</h3>
                    <Anekdootti indeksi={eniten()} />
                </div>

            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)